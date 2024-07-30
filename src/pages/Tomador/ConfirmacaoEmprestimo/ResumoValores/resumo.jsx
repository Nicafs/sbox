import React from 'react';

import ResumoEmprestimo from 'components/ResumoEmprestimo';

export default function CardResumo({ negociacaoCard, textoOpcional }) {
  const { valor, qtdParcelas, taxaJuros } = negociacaoCard;
  const emprestimo = negociacaoCard.simulacao;

  const {
    valorDaParcela,
    valorAPagar,
    valorSeguro,
    parametrizacao,
    valorJuros,
    valorIof,
    parametrizacao: { taxaIof },
  } = emprestimo;

  return (
    <ResumoEmprestimo
      valor={valor}
      qtdParcelas={qtdParcelas}
      valorParcela={valorDaParcela}
      totalApagar={valorAPagar}
      withCard={false}
      valorSeguro={valorSeguro || 0}
      parametrizacao={parametrizacao}
      juros={valorJuros}
      iof={valorIof}
      taxaIof={taxaIof}
      jurosAoMes={taxaJuros}
      mostra
      statusNegociacao="APROVADO"
      pers
      percSeguroConsignado={parametrizacao.percSeguroConsignado || 0}
      textoOpcional={textoOpcional}
    />
  );
}
