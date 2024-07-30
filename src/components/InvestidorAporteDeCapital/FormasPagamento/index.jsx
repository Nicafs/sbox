import React, { useEffect, useState } from 'react';

import { cpfMask } from 'commons/utils/MaskHandle';

import { useCreditoExpress } from '@credito-express/ce-components';

import Grid from '../../MaterialUI/Grid';
import PainelBoleto from './PainelBoleto';
import PainelTransferencia from './PainelTransferencia';
import { ButtonStyled, PagamentosPaperStyled } from './style';

const PainelPagamento = ({
  tipoPagamento,
  dadosContaDigital,
  setDadosContaDigital,
  setDadosPagamento,
}) => {
  if (tipoPagamento === 'TRANSFERENCIA') {
    return (
      <PainelTransferencia
        dadosContaDigital={dadosContaDigital}
        setDadosContaDigital={setDadosContaDigital}
        setDadosPagamento={setDadosPagamento}
      />
    );
  }
  if (tipoPagamento === 'BOLETO') {
    return <PainelBoleto setDadosPagamento={setDadosPagamento} />;
  }
  return null;
};

export default function FormasPagamento({ setDadosPagamento }) {
  const [tipoPagamento, setTipoPagamento] = useState('TRANSFERENCIA');
  const [dadosContaDigital, setDadosContaDigital] = useState({
    codigoBanco: '',
    agenciaBanco: '',
    contaBanco: '',
    nomeInvestidor: '',
    cpfInvestidor: '',
  });

  const {
    state: { pessoa },
  } = useCreditoExpress();

  useEffect(() => {
    const dadosCD = {
      codigoBanco: '',
      agenciaBanco: '',
      contaBanco: '',
      nomeInvestidor: pessoa.nome,
      cpfInvestidor: cpfMask(pessoa.documento),
    };
    setDadosContaDigital(dadosCD);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PagamentosPaperStyled>
      <Grid container direction="column" spacing={5}>
        <Grid item xs={12}>
          <ButtonStyled
            rounded="true"
            variant={tipoPagamento === 'TRANSFERENCIA' ? 'outlined' : 'text'}
            onClick={() => setTipoPagamento('TRANSFERENCIA')}
            ativo={(tipoPagamento === 'TRANSFERENCIA').toString()}
          >
            Transferência
          </ButtonStyled>
          <ButtonStyled
            rounded="true"
            variant={tipoPagamento === 'BOLETO' ? 'outlined' : 'text'}
            onClick={() => setTipoPagamento('BOLETO')}
            ativo={(tipoPagamento === 'BOLETO').toString()}
          >
            Boleto
          </ButtonStyled>
        </Grid>
        <Grid item xs={12}>
          <PainelPagamento
            tipoPagamento={tipoPagamento}
            dadosContaDigital={dadosContaDigital}
            setDadosContaDigital={setDadosContaDigital}
            setDadosPagamento={setDadosPagamento}
          />
        </Grid>
      </Grid>
    </PagamentosPaperStyled>
  );
}
