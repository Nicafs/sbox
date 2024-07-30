import React from 'react';

import { moneyMask } from 'commons/utils/MaskHandle';
import Box from 'components/MaterialUI/Box';
import Grid from 'components/MaterialUI/Grid';

import { Hidden, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { useChatBot } from '../../providers/ChatBot';
import { actionToggleVisibilidadeChatBot } from '../../providers/ChatBot/actions';
import FooterMobileContainer from '../FooterMobileGridContainer';
import {
  BotaoDeAcao,
  GridContainerStyled,
  TypographyValorStyled,
  TypographyQtdStyled,
} from './style';

export default function FooterMobileDetalhesEmprestimo({
  handleNext,
  botaoTexto,
  botaoHabilitado,
  emprestimoEstaCalculado,
  valorEmprestimo,
  quantidadeParcelas,
  valorParcela,
  resumoCompleto = true,
}) {
  const { visivel: chatbotVisivel, dispatch } = useChatBot();

  const onClickHelp = () => {
    const action = actionToggleVisibilidadeChatBot(!chatbotVisivel);
    dispatch(action);
  };

  const renderDadosEmprestimo = () => (
    <Grid container direction="column">
      <Grid item>
        <TypographyValorStyled>
          R$ {moneyMask(valorEmprestimo)}
        </TypographyValorStyled>
      </Grid>
      <Grid item>
        <TypographyQtdStyled>
          em {quantidadeParcelas}x{' '}
          {resumoCompleto ? `de ${moneyMask(valorParcela)}` : ''}
        </TypographyQtdStyled>
      </Grid>
      <Grid item>
        <TypographyQtdStyled>
          <Link
            href="##"
            onClick={() => {
              onClickHelp();
            }}
          >
            PRECISO DE AJUDA
          </Link>
        </TypographyQtdStyled>
      </Grid>
    </Grid>
  );

  const renderInstrucoes = () => (
    <Grid container justify="center" align="center">
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" align="center">
          Preencha o formulário e clique no botão para calcular
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Hidden mdUp>
      <Box mt={11}>&nbsp;</Box>
      <FooterMobileContainer item xs={12}>
        <Box boxShadow={10}>
          <GridContainerStyled container>
            <Grid item xs={7}>
              <Box p={1}>
                {emprestimoEstaCalculado
                  ? renderDadosEmprestimo()
                  : renderInstrucoes()}
              </Box>
            </Grid>
            <Grid item xs={5}>
              <BotaoDeAcao
                botaoDisabled={!botaoHabilitado}
                onClick={botaoHabilitado ? handleNext : () => {}}
                type="submit"
              >
                <Typography variant="body1" align="center" component="span">
                  {botaoTexto}
                </Typography>
              </BotaoDeAcao>
            </Grid>
          </GridContainerStyled>
        </Box>
      </FooterMobileContainer>
    </Hidden>
  );
}
