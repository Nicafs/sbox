import React, { useEffect, useState } from 'react';

import ExternoApi from '../../commons/resources/api/externo-api';
import ParametroApi from '../../commons/resources/parametro';
import InstitucionalContainer from '../../containers/Institucional';
import pushRota from '../../routes/push';

const Institucional = () => {
  const [dadosSelic, setDadosSelic] = useState([]);
  const [taxas, setTaxas] = useState({ cartaoCredito: 0, chequeEspecial: 0 });

  useEffect(() => {
    inicializarInstitucional();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const inicializarInstitucional = () => {
    const temaFixo = process.env.REACT_APP_TEMA_FIXO || '';
    if (!temaFixo.includes('credito_express')) {
      return pushRota('/quero-emprestimo');
    }
    buscaDadosSelic();
    buscaParametrosSistema();
  };

  const buscaDadosSelic = async () => {
    try {
      const codTaxa = '432';
      const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codTaxa}/dados?formato=json`;
      const resultado = await ExternoApi.get(url);
      setDadosSelic(resultado);
    } catch (err) {
      console.error('Ocorreu um erro ao buscar dados Selic', err);
    }
  };

  const buscaParametrosSistema = async () => {
    const {
      itens: parametrosApiResultado,
    } = await ParametroApi.buscaDinamicaDeParametros({
      query: [
        {
          field: 'nome',
          operator: 'icontains',
          value: 'TAXA_CARTAO_CREDITO_MES',
        },
        {
          field: 'nome',
          operator: 'icontains',
          value: 'TAXA_CHEQUE_ESPECIAL_MES',
        },
        {
          field: 'nome',
          operator: 'icontains',
          value: 'TAXA_CREDITO_EXPRESS_MES',
        },
      ],
      joinCondition: 'or',
    });
    const taxaCartaoMensal = parametrosApiResultado
      .filter(({ nome }) => nome === 'TAXA_CARTAO_CREDITO_MES')
      .map(({ valor }) => parseFloat(valor) * 100)[0];
    const taxaChequeMensal = parametrosApiResultado
      .filter(({ nome }) => nome === 'TAXA_CHEQUE_ESPECIAL_MES')
      .map(({ valor }) => parseFloat(valor) * 100)[0];
    const taxaCEmes = parametrosApiResultado
      .filter(({ nome }) => nome === 'TAXA_CREDITO_EXPRESS_MES')
      .map(({ valor }) => parseFloat(valor) * 100)[0];
    const novasTaxas = {
      cartaoCredito: taxaCartaoMensal,
      chequeEspecial: taxaChequeMensal,
      creditoExpress: taxaCEmes,
    };
    setTaxas(novasTaxas);
  };

  return <InstitucionalContainer dadosSelic={dadosSelic} taxas={taxas} />;
};

export default Institucional;
