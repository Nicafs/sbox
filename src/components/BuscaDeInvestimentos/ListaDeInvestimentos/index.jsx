import React from 'react';

import Box from 'components/MaterialUI/Box';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import moment from 'moment';

import BotaoOrdenacao from './BotaoOrdenacao';
import CardOportunidade from './CardOportunidade';
import LoadingListaInvestimentos from './LoadingListaInvestimentos';
import { BotaoFiltrarMobileStyled } from './style';

export default function ListaDeInvestimentos({
  abrirModalDeFiltro,
  investimentoSelecionadoHandler,
  ordenacaoSelecionadaHandler,
  negociacoes,
  ordenacaoSelecionada,
  totalInvestimentos,
  investimentosSelecionados,
  adicionarInvestimentoCarrinho,
  isLoading,
}) {
  return (
    <Box mr={3} ml={3}>
      <Grid container justify="space-between" spacing={3}>
        <Grid
          xs={12}
          md={6}
          item
          container
          spacing={1}
          alignItems="center"
          justify="space-between"
        >
          <Hidden mdUp>
            <Grid item>
              <BotaoFiltrarMobileStyled
                outlinePrimary="true"
                rounded="true"
                onClick={abrirModalDeFiltro}
              >
                Filtrar ({totalInvestimentos})
              </BotaoFiltrarMobileStyled>
            </Grid>
            <Grid item>
              <BotaoOrdenacao
                exibirApenasIcone
                ordenacaoSelecionada={ordenacaoSelecionada}
                ordenacaoSelecionadaHandler={ordenacaoSelecionadaHandler}
              />
            </Grid>
          </Hidden>
        </Grid>
        <Hidden smDown>
          <Grid xs={12} md={6} item container justify="flex-end">
            <Grid item>
              <BotaoOrdenacao
                ordenacaoSelecionada={ordenacaoSelecionada}
                ordenacaoSelecionadaHandler={ordenacaoSelecionadaHandler}
              />
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
      <Grid container spacing={3}>
        {isLoading ? (
          <LoadingListaInvestimentos />
        ) : (
          negociacoes.map(negociacao => {
            const {
              id,
              garantidoRecisao,
              taxaRentabilidade,
              valor,
              tomador: { dataAdmissao, salario },
              empresa: { nome, logo: { urlTemporaria = '' } = {} },
              historicoVisualizacao: {
                qtd,
                tempoLimiteEmHoras,
                ultimaVisualizacaoTimestamp,
              } = {},
            } = negociacao;
            return (
              <Grid
                key={id}
                item
                xs={12}
                md={4}
                onClick={() => investimentoSelecionadoHandler(negociacao)}
              >
                <CardOportunidade
                  name={`card-oportunidade-${id}`}
                  id={id}
                  garantidoRecisao={garantidoRecisao}
                  taxaRentabilidade={taxaRentabilidade}
                  valor={valor}
                  dataAdmissao={dataAdmissao}
                  salario={salario}
                  logoEmpresa={urlTemporaria}
                  nomeEmpresa={nome}
                  investimentoEstaSelecionado={
                    !!investimentosSelecionados.find(inv => inv.id === id)
                  }
                  adicionarInvestimentoCarrinho={evento => {
                    evento.stopPropagation();
                    adicionarInvestimentoCarrinho(negociacao);
                  }}
                  qtdVisualizacoes={qtd}
                  visualizacoesTempoLimite={tempoLimiteEmHoras}
                  ultimaVisualizacao={
                    ultimaVisualizacaoTimestamp
                      ? moment(ultimaVisualizacaoTimestamp).format(
                          'DD/MM/YYYY HH:mm',
                        )
                      : null
                  }
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
}

ListaDeInvestimentos.defaultProps = {
  negociacoes: [],
};
