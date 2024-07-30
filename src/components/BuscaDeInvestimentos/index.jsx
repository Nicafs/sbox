import React, { useState, useEffect } from 'react';

import InvestimentoApi from 'commons/resources/investimento';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import { useAppGlobal } from 'providers/AppGlobal';

import { useCreditoExpress } from '@credito-express/ce-components';

import { calculaInvestimento } from './calculos';
import FiltroDeInvestimentos from './FiltroDeInvestimentos';
import {
  subscribeFirestore,
  salvaHistoricoVisualizacao,
  firestoreBuscarHistoricoVisualizacao,
} from './firestore';
import ListaDeInvestimentos from './ListaDeInvestimentos';
import ModalFiltroDeInvestimentos from './ModalFiltroDeInvestimentos';

// Todo: Mudar para pasta container
export default function BuscaDeInvestimentos({
  setInvestimentoSelecionado,
  avancarStep,
  adicionarInvestimento,
  investimentos,
  parametrosSistema,
  pessoa,
  investimentosRemovidosDoCarrinho,
  setTelaValida,
}) {
  const {
    state: { pessoa: pessoaAutenticada },
  } = useCreditoExpress();

  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [filtroObj, setFiltroObj] = useState({});
  const [ordenacaoSelecionada, setOrdenacaoSelecionada] = useState({
    label: 'Mais rentáveis',
    value: 'MAIS_RENTAVEIS',
  });
  const [filtrosDisponiveis, setFiltrosDisponiveis] = useState({});
  const [negociacoes, setNegociacoes] = useState([]);
  const [totalInvestimentos, setTotalInvestimentos] = useState(0);
  const [loading, setLoading] = useState(true);
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  useEffect(() => {
    setTelaValida(true);
    buscaFiltrosDisponiveis();
    buscarInvestimentos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (filtroObj) {
      buscarInvestimentos();
    }
  }, [filtroObj]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ordenacaoSelecionada && negociacoes.length) {
      buscarInvestimentos();
    }
  }, [ordenacaoSelecionada]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (negociacoes.length > 0) {
      return subscribeFirestore(negociacoes, setNegociacoes, pessoa);
    }
  }, [negociacoes]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (investimentosRemovidosDoCarrinho.length > 0) {
      setNegociacoes(negociacoes.concat(investimentosRemovidosDoCarrinho));
    }
  }, [investimentosRemovidosDoCarrinho]); // eslint-disable-line react-hooks/exhaustive-deps

  const buscaFiltrosDisponiveis = async () => {
    try {
      setFiltrosDisponiveis(await InvestimentoApi.getFiltrosDeInvestimentos());
    } catch (err) {
      // exibirAlerta(err.erro, 'error');
    }
  };

  const filtraInvestimentosExistentesNoCarrinho = negociacoesArr =>
    negociacoesArr.filter(
      ({ id }) => !investimentos.find(({ id: idInv }) => idInv === id),
    );

  const buscarInvestimentos = async () => {
    setLoading(true);
    const { value: ordenacao } = ordenacaoSelecionada;
    const params = {
      filtros: filtroObj,
      ordenacao,
      paginaNumero: 1,
      paginaTamanho: 10,
    };
    try {
      const {
        totalItems,
        itens: investimentosResultado,
      } = await InvestimentoApi.getInvestimentos(params);
      setTotalInvestimentos(totalItems);
      const investimentosFiltradosDoCarrinho = filtraInvestimentosExistentesNoCarrinho(
        investimentosResultado,
      );
      setNegociacoes(investimentosFiltradosDoCarrinho);
      const investimentosComHistoricoDeVisualizacao = await firestoreBuscarHistoricoVisualizacao(
        investimentosFiltradosDoCarrinho,
        pessoa,
      );
      setNegociacoes(investimentosComHistoricoDeVisualizacao);
    } catch (err) {
      const statusCodeComAlerta = [400, 401, 403, 500];
      if (statusCodeComAlerta.includes(err.status)) {
        exibirAlerta(err.erro, 'error');
      }
      setTotalInvestimentos(0);
      setNegociacoes([]);
    } finally {
      setLoading(false);
    }
  };

  const removeInvestimentoDaListagem = ({ id: idRemovido }) => {
    const negociacoesArr = negociacoes.filter(({ id }) => id !== idRemovido);
    setNegociacoes(negociacoesArr);
  };

  const adicionarInvestimentoCarrinho = async investimento => {
    if (investimento) {
      const investimentoExistente = investimentos.find(
        ({ id }) => id === investimento.id,
      );
      if (!investimentoExistente) {
        const investimentoCalculado = await calculaInvestimento(
          investimento,
          parametrosSistema,
        );
        setInvestimentoSelecionado(investimentoCalculado);
        adicionarInvestimento(investimentoCalculado);
        removeInvestimentoDaListagem(investimento);

        const { id: idNegociacao } = investimento;
        const { id: idPessoa } = pessoaAutenticada;
        salvaHistoricoVisualizacao(idNegociacao, idPessoa);
      }
    }
  };

  const setInvestimentoSelecionadoWrapper = async investimento => {
    const { id: idNegociacao } = investimento;
    const { id: idPessoa } = pessoa;
    const investimentoCalculado = await calculaInvestimento(
      investimento,
      parametrosSistema,
    );
    setInvestimentoSelecionado(investimentoCalculado);
    salvaHistoricoVisualizacao(idNegociacao, idPessoa);
    avancarStep();
  };

  const parseFiltroObj = ({
    valor,
    taxaRentabilidade,
    tempoCarteira,
    prazo,
  }) => {
    const dadosEstruturados = [
      {
        backendKey: 'valor',
        valor,
      },
      {
        backendKey: 'taxaRentabilidade',
        valor: taxaRentabilidade,
      },
      {
        backendKey: 'tempoCarteiraAnos',
        valor: tempoCarteira,
      },
      {
        backendKey: 'prazoMeses',
        valor: prazo,
      },
    ];
    const apiJson = {};
    const dadosFiltrado = dadosEstruturados.filter(dadoEstruturado => {
      const {
        valor: { min },
      } = dadoEstruturado;

      return min !== -1;
    });
    dadosFiltrado.map(dadoEstruturado => {
      const { backendKey, valor: v } = dadoEstruturado;
      apiJson[backendKey] = v;
      return dadoEstruturado;
    });
    return apiJson;
  };

  const onFiltroChange = filtroObjChange => {
    const filtroFinal = parseFiltroObj(filtroObjChange);
    setFiltroObj(filtroFinal);
  };

  return (
    <Grid container>
      {modalFiltroVisivel && (
        <ModalFiltroDeInvestimentos
          filtrosDisponiveis={filtrosDisponiveis}
          onFiltroChange={onFiltroChange}
          visivel={modalFiltroVisivel}
          dismissHandler={() => setModalFiltroVisivel(false)}
        />
      )}
      <Grid item xs={12} md={2}>
        <Hidden mdDown>
          <FiltroDeInvestimentos
            filtrosDisponiveis={filtrosDisponiveis}
            onFiltroChange={onFiltroChange}
          />
        </Hidden>
      </Grid>
      <Grid item xs={12} md={10}>
        <ListaDeInvestimentos
          negociacoes={negociacoes}
          totalInvestimentos={totalInvestimentos}
          investimentoSelecionadoHandler={setInvestimentoSelecionadoWrapper}
          ordenacaoSelecionada={ordenacaoSelecionada}
          ordenacaoSelecionadaHandler={val => setOrdenacaoSelecionada(val)}
          abrirModalDeFiltro={() => setModalFiltroVisivel(true)}
          investimentosSelecionados={investimentos}
          adicionarInvestimentoCarrinho={adicionarInvestimentoCarrinho}
          isLoading={loading}
        />
      </Grid>
    </Grid>
  );
}

BuscaDeInvestimentos.label = 'Selecionar oportunidades';
// BuscaDeInvestimentos.title = 'Selecionar oportunidades';
