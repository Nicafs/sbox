import React, { useEffect } from 'react';

import styled from 'styled-components';

import Paper from '../../../MaterialUI/Paper';

const PainelBoletoPaper = styled(Paper)`
  background-color: #f7f7f7;
  padding: ${({ theme }) => theme.spacing(2)}px;
  min-height: 50vh;
  text-align: center;
  vertical-align: middle;
  line-height: 50vh;
`;

export default function PainelBoleto({ setDadosPagamento }) {
  useEffect(() => {
    setDadosPagamento({ tipoPagamento: 'BOLETO' });
    return () => {
      setDadosPagamento();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <PainelBoletoPaper elevation={0}>Mostrar boleto</PainelBoletoPaper>;
}
