import React from 'react';

import { useCreditoExpress } from '@credito-express/ce-components';

import { useSimulacaoState } from '../../pages/Tomador/SolicitacaoEmprestimo/state';
import FooterMobileDetalhesEmprestimo from '../FooterMobileDetalhesEmprestimo';

export default function FooterMobileSolicitacaoEmprestimo({
  handleNext,
  getBotaoTexto,
  getBotaoHabilitado,
}) {
  const {
    state: {
      organizacao: { tipoFluxoEcp },
      pessoa: { parametrizacaoAtiva },
    },
  } = useCreditoExpress();

  const resumoCompleto = tipoFluxoEcp !== 'PORTOCRED' || parametrizacaoAtiva;

  const [
    {
      resumeStatus: { isVisivel: resumoVisivel, isLoading: resumoLoading } = {},
      calculoEmprestimo: {
        valorParcela,
        quantidadeParcelas,
        valorEmprestimo,
      } = {},
    },
  ] = useSimulacaoState();
  const emprestimoEstaCalculado = resumoVisivel && !resumoLoading;

  return (
    <FooterMobileDetalhesEmprestimo
      handleNext={handleNext}
      botaoTexto={getBotaoTexto()}
      botaoHabilitado={getBotaoHabilitado}
      emprestimoEstaCalculado={emprestimoEstaCalculado}
      valorEmprestimo={valorEmprestimo}
      quantidadeParcelas={quantidadeParcelas}
      valorParcela={valorParcela}
      resumoCompleto={resumoCompleto}
    />
  );
}
