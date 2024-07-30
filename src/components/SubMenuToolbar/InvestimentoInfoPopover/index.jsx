import React, { useState, useEffect, useRef } from 'react';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import Popover from 'components/MaterialUI/Popover';
import Typography from 'components/MaterialUI/Typography';

import InvestimentoInfo from '../InvestimentoInfo';
import CardInvestimento from './CardInvestimento';
import { GridCardInvestimentoStyled } from './style';

export default function InvestimentoInfoPopover({
  investimentos,
  removerInvestimentos,
  avancarCarrinhoHandler,
  popoverOpen,
  carrinhoTextoAcao,
  telaValida,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const elemRef = useRef(null);

  useEffect(() => {
    if (popoverOpen && elemRef) {
      setAnchorEl(elemRef.current);
    }
  }, [popoverOpen, elemRef]);

  const avancarInvestimentosHandlerWrapper = () => {
    setAnchorEl(null);
    avancarCarrinhoHandler();
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const somaInvestimentos = () =>
    investimentos
      .map(({ valor }) => valor)
      .reduce((soma, valor) => valor + soma, 0);

  const somaTaxaRentabilidade = () =>
    investimentos
      .map(({ taxaRentabilidade }) => taxaRentabilidade)
      .reduce((soma, valor) => valor + soma, 0);

  const calculaValorRentabilidade = () =>
    investimentos
      .map(({ simulacao: { valorLucro } }) => valorLucro)
      .reduce((soma, valor) => soma + valor, 0);

  const renderNenhumInvestimentoSelecionado = () => (
    <Grid container>
      <Grid item xs={12}>
        <Box m={2}>
          <Typography>Você ainda não selecionou um investimento</Typography>
        </Box>
      </Grid>
    </Grid>
  );

  const renderInvestimentos = () => (
    <Grid
      container
      direction="column"
      spacing={1}
      style={{ minWidth: 350, marginTop: 10, overflowY: 'auto' }}
      name="carrinho-popup"
    >
      {investimentos.map((investimento, i) => {
        const {
          id: idInvestimento,
          valor,
          taxaRentabilidade,
          empresa: { nome: nomeEmpresa, logo: { urlTemporaria } = {} },
        } = investimento;
        return (
          <GridCardInvestimentoStyled key={i} item>
            <CardInvestimento
              name={`popup-investimento-${idInvestimento}`}
              removerInvestimentos={() =>
                removerInvestimentos([idInvestimento])
              }
              valor={valor}
              taxaRentabilidade={taxaRentabilidade}
              nomeEmpresa={nomeEmpresa}
              logoUrl={urlTemporaria}
            />
          </GridCardInvestimentoStyled>
        );
      })}
      <Grid item>
        <Box m={2}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Button
                rounded
                primary
                fullWidth
                onClick={avancarInvestimentosHandlerWrapper}
                name="botao-concluir"
                disabled={!telaValida}
              >
                {carrinhoTextoAcao}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Grid container onClick={handleClick}>
        <Grid item ref={elemRef}>
          <InvestimentoInfo
            qtdInvestimentos={investimentos.length}
            valorTotal={somaInvestimentos()}
            rentabilidadeMedia={somaTaxaRentabilidade()}
            rentabilidadeValor={calculaValorRentabilidade()}
            avancarCarrinhoHandler={avancarCarrinhoHandler}
            textoAcao={carrinhoTextoAcao}
            botaoAvancarDisabled={!telaValida}
          />
        </Grid>
      </Grid>
      <Popover
        name="carrinho-popup"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ marginTop: 15 }}
      >
        {investimentos.length === 0
          ? renderNenhumInvestimentoSelecionado()
          : renderInvestimentos()}
      </Popover>
    </>
  );
}
