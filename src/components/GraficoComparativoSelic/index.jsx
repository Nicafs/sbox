import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, LabelSeries } from 'react-vis';

import temaCreditoExpress from 'commons/temaCreditoExpress';
import roundTo from 'round-to';

import { useAppGlobal } from '../../providers/AppGlobal';

const GraficoComparativoSelic = ({ dados: dadosEntrada }) => {
  const { tema: { muiTheme = temaCreditoExpress } = {} } = useAppGlobal();
  const corPrimaria = muiTheme.palette.primary.main;
  const corSecundaria = muiTheme.palette.secondary.main;
  const dados = dadosEntrada.map(({ data, valor }) => ({
    data,
    valor: roundTo(valor, 2),
  }));
  const data = [
    { x: 0, y: dados[0].valor, color: corSecundaria },
    { x: 1, y: dados[1].valor, color: corSecundaria },
    { x: 2, y: dados[2].valor, color: corSecundaria },
    { x: 3, y: dados[3].valor, color: corSecundaria },
    { x: 4, y: dados[4].valor, color: corPrimaria },
  ];
  const labelsTaxas = [
    {
      x: 4,
      y: dados[4].valor + 1,
      label: `${dados[4].valor}% a.a`,
      style: { fill: corSecundaria, fontSize: 11, fontWeight: 'bold' },
    },
  ];

  const labelsTipos = [
    {
      x: 0,
      y: -2,
      label: dados[0].data,
      style: { fontSize: 14 },
    },
    {
      x: 1,
      y: -2,
      label: dados[1].data,
      style: { fontSize: 14 },
    },
    {
      x: 2,
      y: -2,
      label: dados[2].data,
      style: { fontSize: 14 },
    },
    {
      x: 3,
      y: -2,
      label: dados[3].data,
      style: { fontSize: 14 },
    },
    {
      x: 4,
      y: -2,
      label: dados[4].data,
      style: { fontSize: 14 },
    },
  ];

  return (
    <XYPlot height={300} width={300}>
      <LabelSeries data={labelsTaxas} labelAnchorX="middle" />
      <VerticalBarSeries data={data} colorType="literal" />
      <LabelSeries data={labelsTipos} labelAnchorX="middle" />
    </XYPlot>
  );
};

export default GraficoComparativoSelic;
