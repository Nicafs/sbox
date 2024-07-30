import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import ParametroApi from 'commons/resources/parametro';
import BotaoVoltarFluxoInvestimento from 'components/BotaoVoltarFluxoInvestimento';
import BuscaDeInvestimentos from 'components/BuscaDeInvestimentos';
import DetalhesDoInvestimento from 'components/DetalhesDoInvestimento';
import InvestimentoConcluidoLoader from 'components/FluxoInvestimento/InvestimentoConcluidoLoader';
import Header from 'components/Header';
import InvestidorAporteDeCapital from 'components/InvestidorAporteDeCapital';
import InvestidorInvestimentoConcluido from 'components/InvestidorInvestimentoConcluido';
import InvestidorTermos from 'components/InvestidorTermos';
import Loading from 'components/Loading';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import ResumoDeInvestimentos from 'components/ResumoDeInvestimentos';
import InvestimentoInfoPopover from 'components/SubMenuToolbar/InvestimentoInfoPopover';
import InvestidorCompletarDados from 'containers/Investidor/BuscaDeInvestimentos/InvestidorCompletarDados';
import _ from 'lodash';
import { useAppGlobal } from 'providers/AppGlobal';

import { Steper, useCreditoExpress } from '@credito-express/ce-components';

import Endereco from '../../../commons/resources/endereco';
import Investimento from '../../../commons/resources/investimento';
import PessoaApi from '../../../commons/resources/pessoa';
import pushRota, { replaceRota } from '../../../routes/push';
import {
  atualizarInvestimentosParaConclusaoFirestore,
  subscribeFirestore,
} from './firestore';
import {
  ContainerStyled,
  GridContainerStyled,
  GridHeaderStyled,
  GridStepperContainerStyled,
} from './style';

export default function FluxoInvestimento() {
  const {
    state: { usuarioFirebase: user, pessoa: pessoaLogada },
  } = useCreditoExpress();
  const steps = [
    BuscaDeInvestimentos,
    DetalhesDoInvestimento,
    ResumoDeInvestimentos,
    InvestidorCompletarDados,
    InvestidorTermos,
    InvestidorAporteDeCapital,
    InvestidorInvestimentoConcluido,
  ];
  const [activeStep, setActiveStep] = useState(0);
  const StepEmExibicao = steps[activeStep];
  const [investidor, setInvestidor] = useState(pessoaLogada);
  const [investimentoSelecionado, setInvestimentoSelecionado] = useState(null);
  const [investimentos, setInvestimentos] = useState([]);
  const [parametrosSistema, setParametrosSistema] = useState([]);
  const [popoverCarrinhoAberto, setPopoverCarrinhoAberto] = useState(false);
  const [
    investimentosRemovidosDoCarrinho,
    setInvestimentosRemovidosDoCarrinho,
  ] = useState([]);
  const [botoesAcaoBoleto, setBotoesAcaoBoleto] = useState(false);
  const [finalizandoInvestimento, setFinalizandoInvestimento] = useState(false);
  const [telaValida, setTelaValida] = useState(false);
  const {
    actions: { exibirAlerta: exibirAlertaFn },
  } = useAppGlobal();
  const history = useHistory();

  async function atualizaInvestidor() {
    const [{ pessoa }, endereco] = await Promise.all([
      PessoaApi.get(),
      Endereco.getEnderecoAtualNoCadastro(),
    ]);
    const {
      pessoaFisica: {
        estadoCivil = '',
        profissao = '',
        dadosRg: { rg } = {},
      } = {},
    } = pessoa;
    const { cidadeRef, cidade, cepRef = true } = endereco;
    setInvestidor({
      estadoCivil,
      rg,
      profissao,
      ...endereco,
      cidade,
      cidadeRef,
      cepEncontrado: !!cepRef,
    });
  }

  useEffect(() => {
    atualizaInvestidor();
  }, []);

  useEffect(() => {
    carregarParametrosSistema();
  }, []);

  useEffect(() => {
    const investimentoArr = concatenaInvestimentoSelecionado(
      investimentos,
      investimentoSelecionado,
    );
    if (investimentoArr.length > 0 && !_.isEqual(investimentos)) {
      const { id: idPessoaAutenticada } = pessoaLogada;
      const unsubscribeFn = subscribeFirestore(
        investimentoArr,
        removerInvestimentos,
        idPessoaAutenticada,
        exibirAlertaFn,
      );
      return unsubscribeFn;
    }
  }, [investimentos, investimentoSelecionado]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (history.action === 'POP') {
      replaceRota('/investidor/busca-investimentos-disponiveis');
    }
  }, [history]);

  const concatenaInvestimentoSelecionado = (
    investimentosArr,
    invSelecionado,
  ) => {
    if (invSelecionado) {
      const { id: idSelecionado } = invSelecionado;
      const investimentoExistente = investimentosArr.find(
        ({ id }) => id === idSelecionado,
      );
      return !investimentoExistente
        ? investimentos.concat(invSelecionado)
        : investimentosArr;
    }
    return investimentosArr;
  };

  const scrollToTop = () => window.scrollTo(0, 0);

  const realizarInvestimento = async () => {
    const idsInvestimentos = investimentos.map(({ id }) => id);
    await Investimento.investir({
      investimentos: idsInvestimentos,
    });
    await atualizarInvestimentosParaConclusaoFirestore(
      idsInvestimentos,
      pessoaLogada.id,
    );
    setInvestimentos([]);
    setInvestimentoSelecionado(null);
    setFinalizandoInvestimento(false);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const isBeforeLastStep = () => {
    return activeStep === steps.length - 2;
  };

  const handleNext = () => {
    scrollToTop();
    if (isBeforeLastStep()) {
      realizarInvestimento();
      setFinalizandoInvestimento(true);
    } else {
      setTelaValida(false);
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setTelaValida(false);
      scrollToTop();
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  const adicionarInvestimento = investimento => {
    setPopoverCarrinhoAberto(true);
    setInvestimentos(investimentos.concat(investimento));
  };

  const removerInvestimentos = idsInvestimentos => {
    const investimentosRemovidos = investimentos.filter(({ id }) =>
      idsInvestimentos.includes(id),
    );
    const novosInvestimentos = investimentos.filter(
      ({ id }) => !idsInvestimentos.includes(id),
    );
    setInvestimentos(novosInvestimentos);
    setInvestimentosRemovidosDoCarrinho(investimentosRemovidos);

    const idsInvestimentosRemovidos = investimentosRemovidos.map(
      invR => invR.id,
    );
    if (
      investimentoSelecionado &&
      idsInvestimentosRemovidos.includes(investimentoSelecionado.id)
    ) {
      setInvestimentoSelecionado(null);
    }
    if (novosInvestimentos.length === 0) {
      setActiveStep(0);
    }
  };

  const avancarCarrinhoHandler = () => {
    const avancaParaResumo = () => setActiveStep(2);

    const idxTelaListagemInvestimentos = 0;
    if (activeStep === idxTelaListagemInvestimentos) {
      avancaParaResumo();
    } else {
      handleNext();
    }
  };

  const getCarrinhoTextoAcao = () => {
    if (activeStep === 0) {
      return 'CONCLUIR';
    }
    return 'AVANÇAR';
  };

  const carregarParametrosSistema = async () => {
    const {
      itens: parametrosApiResultado,
    } = await ParametroApi.buscaDinamicaDeParametros({
      query: [
        {
          field: 'nome',
          operator: 'icontains',
          value: 'TAXA',
        },
      ],
    });
    setParametrosSistema(parametrosApiResultado);
  };

  const logout = () => {
    pushRota('/logout');
  };

  const paginaEstaCarregando = parametrosSistema.length === 0;

  if (paginaEstaCarregando) {
    return <Loading />;
  }

  return (
    <GridContainerStyled container>
      <Grid item style={{ overflow: 'hidden', width: '100%' }}>
        <GridStepperContainerStyled container spacing={3}>
          <GridHeaderStyled item xs={12}>
            <Header
              menuSelecionadoIdx={0}
              menu={[
                {
                  titulo: 'Oportunidades',
                  onClick: () => {},
                  inserirDivisao: true,
                },
              ]}
              pessoa={pessoaLogada}
              elevation={0}
              subMenuComponent={
                <InvestimentoInfoPopover
                  removerInvestimentos={removerInvestimentos}
                  investimentos={investimentos}
                  popoverOpen={popoverCarrinhoAberto}
                  avancarCarrinhoHandler={avancarCarrinhoHandler}
                  carrinhoTextoAcao={getCarrinhoTextoAcao()}
                  telaValida={telaValida}
                />
              }
              logout={logout}
            />
          </GridHeaderStyled>
          <Grid item container style={{ paddingTop: 0, paddingRight: 0 }}>
            {activeStep > 0 && (
              <Grid item xs={1}>
                <BotaoVoltarFluxoInvestimento handleBack={handleBack} />
              </Grid>
            )}
            <Grid item xs={activeStep > 0 ? 11 : 12}>
              <Steper activeStep={activeStep} steps={steps} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ContainerStyled maxWidth="xl">
              <Grid container>
                <Grid item xs={12}>
                  <Typography color="textSecondary">
                    {StepEmExibicao.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {finalizandoInvestimento ? (
                    <InvestimentoConcluidoLoader />
                  ) : (
                    <StepEmExibicao
                      setTelaValida={setTelaValida}
                      telaValida={telaValida}
                      usuarioAutenticado={user}
                      investidor={investidor}
                      setInvestidor={setInvestidor}
                      pessoa={pessoaLogada}
                      investimentoSelecionado={investimentoSelecionado}
                      setInvestimentoSelecionado={setInvestimentoSelecionado}
                      avancarStep={handleNext}
                      handleBack={handleBack}
                      adicionarInvestimento={adicionarInvestimento}
                      investimentos={investimentos}
                      parametrosSistema={parametrosSistema}
                      investimentosRemovidosDoCarrinho={
                        investimentosRemovidosDoCarrinho
                      }
                      botoesAcaoBoleto={botoesAcaoBoleto}
                      setBotoesAcaoBoleto={setBotoesAcaoBoleto}
                      isBeforeLastStep={isBeforeLastStep}
                      enviarBoletoPorEmail={() => {}}
                      imprimirBoleto={() => {}}
                    />
                  )}
                </Grid>
              </Grid>
            </ContainerStyled>
          </Grid>
        </GridStepperContainerStyled>
      </Grid>
    </GridContainerStyled>
  );
}
