import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  VerticalBarSeries,
  LineMarkSeries,
  LabelSeries,
} from 'react-vis';

import temaCreditoExpress from 'commons/temaCreditoExpress';
import roundTo from 'round-to';

import { useAppGlobal } from '../../providers/AppGlobal';

const GraficoComparativoTaxas = ({
  taxaCE: numCE,
  taxaCartao: numCartao,
  taxaCheque: numCheque,
}) => {
  const { tema: { muiTheme = temaCreditoExpress } = {} } = useAppGlobal();
  const corPrimaria = muiTheme.palette.primary.main;
  const corSecundaria = muiTheme.palette.secondary.main;
  const taxaCE = roundTo(numCE, 2);
  const taxaCartao = roundTo(numCartao, 2);
  const taxaCheque = roundTo(numCheque, 2);

  const data = [
    { x: 0, y: taxaCE, color: corPrimaria },
    { x: 1, y: taxaCheque, color: corSecundaria },
    { x: 2, y: taxaCartao, color: corSecundaria },
  ];
  const labelsTaxas = [
    {
      x: 0,
      y: taxaCE + 2,
      label: `${taxaCE}% a.m`,
      style: { fill: corPrimaria, fontSize: 14, fontWeight: 'bold' },
    },
    {
      x: 1,
      y: taxaCheque + 2,
      label: `${taxaCheque}% a.m`,
      style: { fill: corSecundaria, fontSize: 14, fontWeight: 'bold' },
    },
    {
      x: 2,
      y: taxaCartao + 2,
      label: `${taxaCartao}% a.m`,
      style: { fill: corSecundaria, fontSize: 14, fontWeight: 'bold' },
    },
  ];

  const gerarLabelsTipo = () => {
    const distanciaLabelVertical = -1;
    const labelsTextos = [
      { texto: 'Crédito\nExpress', x: 0, y: -2 },
      { texto: 'Cheque\nEspecial', x: 1, y: -2 },
      { texto: 'Cartão de\nCrédito', x: 2, y: -2 },
    ];
    const labelsGerados = [];

    labelsTextos.forEach(({ texto, x, y }) => {
      texto.split('\n').forEach((textoPart, idx) => {
        labelsGerados.push({
          x,
          y: y + distanciaLabelVertical * idx,
          label: textoPart,
          style: { fontSize: 14 },
        });
      });
    });

    return labelsGerados;
  };

  const labelsTipos = gerarLabelsTipo();

  // const labelsTipos = [
  //   {
  //     x: 0,
  //     y: -3,
  //     label: 'Crédito Express',
  //     style: { fontSize: 12 },
  //     // rotation: 30,
  //     // xOffset: 20,
  //   },
  //   {
  //     x: 1,
  //     y: -3,
  //     label: 'Cheque Especial',
  //     style: { fontSize: 12 },
  //     // rotation: 30,
  //     // xOffset: 20,
  //   },
  //   {
  //     x: 2,
  //     y: -3,
  //     label: 'Cartão de Crédito',
  //     style: { fontSize: 12 },
  //     // rotation: 30,
  //     // xOffset: 20,
  //   },
  // ];
  return (
    <XYPlot height={300} width={300}>
      <LabelSeries data={labelsTaxas} labelAnchorX="middle" />
      <LineMarkSeries colorType="literal" curve="curveMonotoneX" data={data} />
      <VerticalBarSeries data={data} colorType="literal" />
      <LabelSeries data={labelsTipos} labelAnchorX="middle" />
    </XYPlot>
  );
};

export default GraficoComparativoTaxas;
