import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EmpresaApi from 'commons/resources/empresa';
import NegociacaoApi from 'commons/resources/negociacao';
import ParametroApi from 'commons/resources/parametro';
import DetalheEmprestimoContainer from 'containers/Tomador/DetalheEmprestimo';

import Loading from '../../../components/Loading';
import { useCreditoExpress } from '@credito-express/ce-components';

export default function DetalheEmprestimo() {
  const { id } = useParams();
  const [negociacao, setNegociacao] = useState();
  const [empresa, setEmpresa] = useState();
  const [parametrosSistema, setParametrosSistema] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    state: {
      organizacao: { tipoFluxoEp = '' },
    },
  } = useCreditoExpress();
  const ehFluxoEp = tipoFluxoEp === 'BANCO_SEMEAR';

  useEffect(() => {
    buscarDados();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const buscarDados = async () => {
    try {
      const negociacaoResultado = await buscarNegociacao();
      if (!ehFluxoEp) {
        await buscarEmpresaPorNegociacao(negociacaoResultado);
        await buscarParametrosSistema();
      }
    } catch (err) {
      console.error('Ocorreu um erro ao buscar os dados: ', err);
    } finally {
      setLoading(false);
    }
  };

  const buscarNegociacao = async () => {
    const negociacaoResultado = await NegociacaoApi.buscarPorId(id);
    setNegociacao(negociacaoResultado);
    return negociacaoResultado;
  };

  const buscarEmpresaPorNegociacao = async negociacaoResultado => {
    const {
      dadosEmpresa: { empresa: idEmpresa },
    } = negociacaoResultado;
    const empresaResultado = await EmpresaApi.getEmpresa(idEmpresa);
    setEmpresa(empresaResultado);
    return empresaResultado;
  };

  const buscarParametrosSistema = async () => {
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

  if (!negociacao || loading) {
    return <Loading />;
  }

  const buscarParametroSistema = (parametro, parametros) =>
    parseFloat(parametros.find(p => p.nome === parametro).valor);

  const taxaChequeEspecial = ehFluxoEp
    ? ''
    : buscarParametroSistema('TAXA_CHEQUE_ESPECIAL_MES', parametrosSistema);
  const taxaCartaoCredito = ehFluxoEp
    ? ''
    : buscarParametroSistema('TAXA_CARTAO_CREDITO_MES', parametrosSistema);

  return (
    <DetalheEmprestimoContainer
      negociacao={negociacao}
      empresa={empresa}
      parametrosSistema={parametrosSistema}
      taxaChequeEspecial={taxaChequeEspecial}
      taxaCartaoCredito={taxaCartaoCredito}
      ehFluxoEp={ehFluxoEp}
    />
  );
}
