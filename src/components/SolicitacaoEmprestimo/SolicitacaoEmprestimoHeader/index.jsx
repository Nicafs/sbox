import React from 'react';

import TipoLogo from 'commons/enums/TipoLogo';
import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import Hidden from '@material-ui/core/Hidden';

import { Steper, useCreditoExpress } from '@credito-express/ce-components';

import HeaderTomador from '../../HeaderTomador';
import SolicitacaoEmprestimoHeaderDesktop from './SolicitacaoEmprestimoHeaderDesktop';
import { HeaderGridContainerStyled, GridStepperStyled } from './styles';

export default function SolicitacaoEmprestimoHeader({
  steps,
  lazyLabels,
  logout,
  activeStep,
}) {
  const {
    actions: { getLogo },
  } = useAppGlobal();
  const {
    state: {
      pessoa,
      organizacao: { temaPadrao, tipoFluxoEcp },
    },
  } = useCreditoExpress();

  const resumoCompleto =
    tipoFluxoEcp !== 'PORTOCRED' || pessoa.parametrizacaoAtiva;
  const [
    {
      simulacaoValues = {},
      tokenData: { taxaJuros } = {},
      calculoEmprestimo: { valorParcela = 0 } = {},
    },
    { voltar },
  ] = useSimulacaoState();

  return (
    <HeaderGridContainerStyled container>
      <Hidden smDown>
        <SolicitacaoEmprestimoHeaderDesktop
          btnVoltarClickHandler={() => voltar()}
          temaPadrao={temaPadrao}
          logo={getLogo(TipoLogo.LOGO_PADRAO_COLORIDA)}
          parcelas={simulacaoValues.parcelas}
          valorParcela={valorParcela}
          valor={simulacaoValues.valor}
          logout={logout}
          taxaJuros={taxaJuros}
          resumoCompleto={resumoCompleto}
        />
      </Hidden>
      <Hidden mdUp>
        <HeaderTomador pessoa={pessoa} menuSelecionadoIdx={1} />
      </Hidden>
      <GridStepperStyled item xs={12}>
        <Steper
          activeStep={activeStep}
          steps={steps}
          lazyLabels={lazyLabels}
          btnVoltarClickHandler={() => voltar()}
          exibirBotaoVoltar="true"
        />
      </GridStepperStyled>
    </HeaderGridContainerStyled>
  );
}

SolicitacaoEmprestimoHeader.propTypes = {
  lazyLabels: PropTypes.arrayOf(PropTypes.string),
  steps: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string }))
    .isRequired,
};

SolicitacaoEmprestimoHeader.defaultProps = {
  lazyLabels: [],
};
