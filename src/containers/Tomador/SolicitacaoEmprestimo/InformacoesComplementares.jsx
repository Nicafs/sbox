import React, { useEffect, useRef } from 'react';

import TipoLogo from 'commons/enums/TipoLogo';
import {
  gerarValorInicialCampoAdicional,
  gerarYupCampoAdicional,
} from 'commons/utils/camposPersonalizadosUtil';
import Yup from 'commons/Yup';
import Button from 'components/MaterialUI/Button';
import Container from 'components/MaterialUI/Container';
import DetalhesDesktop from 'components/SolicitacaoEmprestimo/DadosFinais/DetalhesDesktop';
import { useFormik } from 'formik';
import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';
import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { useCreditoExpress, useFirebase } from '@credito-express/ce-components';

import { gerarJsxCamposAdicionais } from '../../../commons/utils/camposPersonalizadosUtil';
import FooterMobileSolicitacaoEmprestimo from '../../../components/FooterMobileSolicitacaoEmprestimo';

const ContainerStyled = styled(Grid)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 86.5vh;
  }
  ${({ theme }) => theme.breakpoints.up('xl')} {
    height: 91vh;
  }
`;

const Titulo = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;
`;

export default function InformacoesComplementares({ atualizarDadosLocal }) {
  const firebase = useFirebase();
  const [state, { etapaInfosComplemtares }] = useSimulacaoState();
  const {
    empresa,
    organizacao: { camposPersonalizados: { infosAdicionais = [] } = {} },
    camposAdicionais: valoresCamposAdicionais,
  } = state;

  const {
    actions: { getLogo },
  } = useAppGlobal();
  const {
    state: { organizacao },
  } = useCreditoExpress();
  const { tipoFluxoEcp } = organizacao;

  const camposAdicionais = infosAdicionais
    .sort((a, b) => a.posicao - b.posicao)
    .filter(({ disponivel }) => disponivel);

  const yupSchema = Yup.object().shape(
    infosAdicionais
      .map(gerarYupCampoAdicional)
      .reduce((a, b) => ({ ...a, ...b }), {}),
  );
  const formik = useFormik({
    initialValues: infosAdicionais
      .map(campo => {
        return gerarValorInicialCampoAdicional(campo, valoresCamposAdicionais);
      })
      .reduce((a, b) => ({ ...a, ...b }), {}),
    validationSchema: yupSchema,
    onSubmit: etapaInfosComplemtares,
  });

  useEffect(() => {
    firebase.analytics().logEvent('acessou_informacoes_complementares');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const primeiroRender = useRef(true);
  useEffect(() => {
    if (primeiroRender.current) {
      primeiroRender.current = false;
      return;
    }
    atualizarDadosLocal({ pessoa: formik.values });
  }, [formik.values]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContainerStyled container>
      <Grid item container xs={12} md={7} justify="center" alignItems="center">
        <Container maxWidth="lg">
          <Titulo>
            {tipoFluxoEcp === 'PORTOCRED'
              ? 'Informe duas referências pessoais'
              : 'Informações Adicionais'}
          </Titulo>
          <Grid container spacing={2}>
            {gerarJsxCamposAdicionais(camposAdicionais, formik)}
          </Grid>
          <Hidden smDown>
            <Grid container direction="row-reverse">
              <Grid item xs={12} md={2}>
                <Box mt={4} mb={4}>
                  <Button
                    cy-element="btnSubmit"
                    secondary="true"
                    rounded="true"
                    fullWidth
                    // loading={loading}
                    onClick={() => formik.handleSubmit()}
                  >
                    Avançar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Hidden>
        </Container>
      </Grid>

      <FooterMobileSolicitacaoEmprestimo
        getBotaoTexto={() => 'AVANÇAR'}
        getBotaoHabilitado={() => formik.isValid}
        handleNext={formik.submitForm}
      />
      <Hidden smDown>
        <DetalhesDesktop
          empresa={empresa}
          logo={getLogo(TipoLogo.BRASAO_MONOCROMATICO)}
          organizacao={organizacao}
        />
      </Hidden>
    </ContainerStyled>
  );
}

InformacoesComplementares.whyDidYouRender = true;
