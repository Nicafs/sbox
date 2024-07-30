import React, { useState, useEffect } from 'react';

import { moneyMask, percentMask } from 'commons/utils/MaskHandle';
import Grid from 'components/MaterialUI/Grid';

import FiltroItemRadio from './FiltroItemRadio';
import { TituloDoContainer } from './style';

export default function FiltroDeInvestimentos({
  onFiltroChange,
  filtrosDisponiveis,
}) {
  const filtroPadrao = {
    titulo: 'Todos',
    valor: {
      min: -1,
      max: -1,
    },
  };
  const {
    valor: apiValorFiltros,
    tempoCarteiraAnos: apiTempoCarteiraFiltros,
    taxaRentabilidade: apiTaxaRentabilidadeFiltros,
    prazoMeses: apiPrazoFiltros,
  } = filtrosDisponiveis;
  const [filtroValorVal, setFiltroValorVal] = useState({
    min: -1,
    max: -1,
  });
  const [filtroTaxaVal, setFiltroTaxaVal] = useState({
    min: -1,
    max: -1,
  });
  const [filtroTempoCarteiraVal, setFiltroTempoCarteiraVal] = useState({
    min: -1,
    max: -1,
  });
  const [filtroPrazoVal, setFiltroPrazoVal] = useState({
    min: -1,
    max: -1,
  });
  const [filtroValorOptions, setFiltroValorOptions] = useState([filtroPadrao]);
  const [filtroTaxaOptions, setFiltroTaxaOptions] = useState([filtroPadrao]);
  const [
    filtroCarteiraAssinadaOptions,
    setFiltroCarteiraAssinadaOptions,
  ] = useState([filtroPadrao]);
  const [filtroPrazoOptions, setFiltroPrazoOptions] = useState([filtroPadrao]);

  useEffect(() => {
    if (filtrosDisponiveis && Object.keys(filtrosDisponiveis).length > 0) {
      if (apiValorFiltros) {
        setFiltroValorOptions(
          [filtroPadrao].concat(formataFiltros(apiValorFiltros, 'money')),
        );
      }
      if (apiTaxaRentabilidadeFiltros) {
        setFiltroTaxaOptions(
          [filtroPadrao].concat(
            formataFiltros(apiTaxaRentabilidadeFiltros, 'percentage'),
          ),
        );
      }
      if (apiTempoCarteiraFiltros) {
        setFiltroCarteiraAssinadaOptions(
          [filtroPadrao].concat(
            formataFiltros(apiTempoCarteiraFiltros, 'year'),
          ),
        );
      }
      if (apiPrazoFiltros) {
        setFiltroPrazoOptions(
          [filtroPadrao].concat(formataFiltros(apiPrazoFiltros, 'months')),
        );
      }
    }
  }, [filtrosDisponiveis]); // eslint-disable-line react-hooks/exhaustive-deps

  const formataFiltros = (filtros, tipoValor = 'money') => {
    const filtrosFormatados = filtros.map(({ min, max }) => {
      let titulo = '';
      if (tipoValor === 'money') {
        titulo =
          max === -1
            ? `Acima de R$ ${moneyMask(min)}`
            : `De R$ ${moneyMask(min)} a R$ ${moneyMask(max)}`;
      } else if (tipoValor === 'percentage') {
        titulo =
          max === -1
            ? `Acima de ${percentMask(min)}%`
            : `De ${percentMask(min)} a ${percentMask(max)}%`;
      } else if (tipoValor === 'year') {
        titulo =
          max === -1 ? `Acima de ${min} anos` : `De ${min} a ${max} anos`;
      } else if (tipoValor === 'months') {
        titulo =
          max === -1 ? `Acima de ${min} meses` : `De ${min} a ${max} meses`;
      }
      return {
        titulo,
        valor: {
          min,
          max,
        },
      };
    });
    return filtrosFormatados;
  };

  useEffect(() => {
    onFiltroChange({
      valor: filtroValorVal,
      taxaRentabilidade: filtroTaxaVal,
      tempoCarteira: filtroTempoCarteiraVal,
      prazo: filtroPrazoVal,
    });
  }, [filtroValorVal, filtroTaxaVal, filtroTempoCarteiraVal, filtroPrazoVal]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TituloDoContainer color="textSecondary">FILTROS</TituloDoContainer>
      </Grid>
      {/* <Grid item xs={12}>
        <FiltroItemInputMonetario titulo="Quanto quer investir?" />
      </Grid> */}
      <Grid item xs={12}>
        <FiltroItemRadio
          titulo="Valor"
          options={filtroValorOptions}
          onChange={setFiltroValorVal}
          valor={filtroValorVal}
        />
      </Grid>
      <Grid item xs={12}>
        <FiltroItemRadio
          titulo="Taxa (rentabilidade)"
          options={filtroTaxaOptions}
          onChange={setFiltroTaxaVal}
          valor={filtroTaxaVal}
        />
      </Grid>
      <Grid item xs={12}>
        <FiltroItemRadio
          titulo="Tempo de carteira assinada"
          options={filtroCarteiraAssinadaOptions}
          onChange={setFiltroTempoCarteiraVal}
          valor={filtroTempoCarteiraVal}
        />
      </Grid>
      <Grid item xs={12}>
        <FiltroItemRadio
          titulo="Prazo"
          options={filtroPrazoOptions}
          onChange={setFiltroPrazoVal}
          valor={filtroPrazoVal}
        />
      </Grid>
    </Grid>
  );
}
