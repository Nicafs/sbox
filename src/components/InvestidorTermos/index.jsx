import React, { useState, useEffect, useMemo } from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import { Hidden } from '@material-ui/core';

import InvestimentoApi from '../../commons/resources/investimento';
import { toRomanNumber } from '../../commons/utils/MaskHandle';
import BotoesAcaoFooter from '../FluxoInvestimento/BotoesDeAcaoFooter';
import Box from '../MaterialUI/Box';
import Checkbox from '../MaterialUI/Checkbox';
import Container from '../MaterialUI/Container';
import FormControlLabel from '../MaterialUI/FormControlLabel';
import Grid from '../MaterialUI/Grid';
import Paper from '../MaterialUI/Paper';
import Header from './Header';
import InvestidorTermosLoader from './InvestidorTermosLoader';
import {
  AppBarStyled,
  TabsStyled,
  TabStyled,
  DivTermosAceiteStyled,
} from './style';
import TermoBody from './TermoBody';
import TermoTabPanel from './TermoTabPanel';

const generateA11yTabProps = (prefix, index) => {
  return {
    id: `${prefix}-tab-${index}`,
    'aria-controls': `${prefix}-tabpanel-${index}`,
  };
};

const ContratoContent = ({ isLoading, dadosContrato }) => {
  if (isLoading) {
    return <InvestidorTermosLoader />;
  }
  if (dadosContrato) {
    return <TermoBody dadosContrato={dadosContrato} />;
  }
  return 'Erro ao buscar informações do contrato. Visualização do contrato indisponível.';
};

export default function InvestidorTermos({
  investimentos,
  botoesAcaoBoleto,
  avancarStep,
  isBeforeLastStep,
  imprimirBoleto,
  enviarBoletoPorEmail,
  investimentoSelecionado,
  setTelaValida,
  telaValida,
}) {
  const [contratosConsultados, setContratosConsultados] = useState([]);
  const [dadosContrato, setDadosContrato] = useState(undefined);
  const [termosAceite, setTermosAceite] = useState([
    {
      checked: false,
    },
  ]);
  const [permiteAvancar, setPermiteAvancar] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [buscandoDadosContrato, setBuscandoDadosContrato] = useState(false);

  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  useEffect(() => {
    const termosAtualizados = investimentos.map(inv => ({
      idNegociacao: inv.id,
      checked: false,
    }));
    setTermosAceite(termosAtualizados);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useMemo(() => {
    setTelaValida(permiteAvancar);
  }, [permiteAvancar]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAvancar = () => {
    if (permiteAvancar) {
      avancarStep();
    }
  };

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const updateTermosAceite = (idxToUpdate, newValue) => {
    const termosAtualizados = termosAceite.map((ta, index) => ({
      idNegociacao: ta.idNegociacao,
      checked: idxToUpdate === index ? newValue : ta.checked,
    }));
    setTermosAceite(termosAtualizados);
  };

  useEffect(() => {
    const termosNaoSelecionados = termosAceite.filter(ta => !ta.checked);
    if (termosAceite.length > 0 && termosNaoSelecionados.length === 0) {
      setPermiteAvancar(true);
    } else {
      setPermiteAvancar(false);
    }
  }, [termosAceite]);

  useEffect(() => {
    setBuscandoDadosContrato(true);
    buscarDadosContrato(investimentos[tabIndex].id);
  }, [tabIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const buscarDadosContrato = async idNegociacao => {
    try {
      const contratoConsultado = contratosConsultados.filter(
        contrato => contrato.negociacao.id === idNegociacao,
      );
      if (contratoConsultado.length > 0) {
        setDadosContrato(contratoConsultado[0]);
        setBuscandoDadosContrato(false);
        return;
      }

      const responseDadosContrato = await InvestimentoApi.getDadosContrato(
        idNegociacao,
      );
      const investimento = investimentos.filter(
        inv => inv.id === responseDadosContrato.negociacao.id,
      );
      responseDadosContrato.negociacao.parcelas =
        investimento[0].simulacao.parcelas;

      setContratosConsultados([...contratosConsultados, responseDadosContrato]);
      setDadosContrato(responseDadosContrato);
      setBuscandoDadosContrato(false);
    } catch (e) {
      const msg = `Erro. ${
        e.response
          ? e.response.data.erros.map(
              err => `Código: ${err.codigo} - Descrição: ${err.descricao}.`,
            )
          : 'Erro inesperado.'
      }`;
      exibirAlerta(msg, 'error');
      setDadosContrato(undefined);
      setBuscandoDadosContrato(false);
    }
  };
  const renderCheckboxTermo = () => {
    if (buscandoDadosContrato) {
      return null;
    }

    return (
      <DivTermosAceiteStyled>
        <FormControlLabel
          control={
            <Checkbox
              name="checkbox-termo"
              cy-element="checkboxTermo"
              checked={termosAceite[tabIndex].checked}
              onChange={() =>
                updateTermosAceite(tabIndex, !termosAceite[tabIndex].checked)
              }
              color="primary"
            />
          }
          label="Li e concordo com os termos acima."
        />
      </DivTermosAceiteStyled>
    );
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <AppBarStyled position="static" elevation={0}>
              <TabsStyled
                value={tabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Tabs dos termos de investimento"
              >
                {investimentos.map((_, index) => (
                  <TabStyled
                    label={`Contrato ${toRomanNumber(index + 1)}`}
                    {...generateA11yTabProps('contrato', index)}
                    key={`key-contrato-tab-${index}`}
                    name={`key-contrato-tab-${index}`}
                  />
                ))}
              </TabsStyled>
            </AppBarStyled>
            {investimentos.map((_, index) => (
              <TermoTabPanel
                value={tabIndex}
                prefix="contrato"
                index={index}
                key={`key-contrato-tabpanel-${index}`}
              >
                <ContratoContent
                  isLoading={buscandoDadosContrato}
                  dadosContrato={dadosContrato}
                />
              </TermoTabPanel>
            ))}
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item xs={12}>
            {renderCheckboxTermo()}
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Box mt={3}>
              <BotoesAcaoFooter
                botoesAcaoBoleto={botoesAcaoBoleto}
                handleNext={handleAvancar}
                isBeforeLastStep={isBeforeLastStep}
                imprimirBoleto={imprimirBoleto}
                enviarBoletoPorEmail={enviarBoletoPorEmail}
                investimentos={investimentos}
                investimentoSelecionado={investimentoSelecionado}
                textoBotaoFooter="CONTINUAR"
                mobileRenderBefore={renderCheckboxTermo}
                botaoAvancarDisabled={!telaValida}
              />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

// InvestidorTermos.title = 'Aceitar termos';
InvestidorTermos.label = 'Aceitar termos';

InvestidorTermos.defaultProps = {
  handleBack: () => {},
};

InvestidorTermos.propTypes = {
  handleBack: PropTypes.func,
};
