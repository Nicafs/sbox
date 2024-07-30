import React from 'react';

import { useAppGlobal } from 'providers/AppGlobal';

import {
  HeaderDesktopStyled,
  HeaderTextDescStyled,
  HeaderTextDesktopStyled,
} from './style';

const DetalheDesktop = () => {
  const {
    actions: { getTextoOrganizacao },
  } = useAppGlobal();

  const { titulo, subtitulo2 } = getTextoOrganizacao();

  return (
    <HeaderDesktopStyled>
      <HeaderTextDesktopStyled>{titulo}</HeaderTextDesktopStyled>
      <HeaderTextDescStyled>{subtitulo2}</HeaderTextDescStyled>
    </HeaderDesktopStyled>
  );
};

export default DetalheDesktop;
