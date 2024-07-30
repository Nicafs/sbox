import React from 'react';
import { withRouter } from 'react-router';

import { useAppGlobal } from 'providers/AppGlobal';

import TipoLogo from '../../commons/enums/TipoLogo';
import pushRota from '../../routes/push';
import {
  HeaderContainer,
  Logo,
  ButtonLinkStyled,
  ButtonMinhaContaStyled,
} from './style';

const HeaderInstitucional = () => {
  const {
    actions: { getLogo },
  } = useAppGlobal();

  return (
    <HeaderContainer
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Logo src={getLogo(TipoLogo.LOGO_MONOCROMATICA)} />
      <div>
        <ButtonLinkStyled>Início</ButtonLinkStyled>
        <ButtonLinkStyled onClick={() => pushRota('/quero-investir')}>
          Quero investir
        </ButtonLinkStyled>
        <ButtonLinkStyled
          cy-element="btnQueroEmprestimo"
          onClick={() => pushRota('/quero-emprestimo')}
        >
          Quero empréstimo
        </ButtonLinkStyled>
        <ButtonMinhaContaStyled onClick={() => pushRota('/auth')}>
          Minha conta
        </ButtonMinhaContaStyled>
      </div>
    </HeaderContainer>
  );
};

export default withRouter(HeaderInstitucional);
