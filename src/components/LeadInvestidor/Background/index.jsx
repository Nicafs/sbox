import React from 'react';

import { useAppGlobal } from 'providers/AppGlobal';

import {
  GridContainerStyled,
  TypographyFooterStyled,
  TypographyParagrafoStyled,
  TypographyTituloStyled,
} from './style';

const Background = () => {
  const {
    actions: { getTextoOrganizacao },
  } = useAppGlobal();

  const { titulo, subtitulo2 } = getTextoOrganizacao();

  return (
    <GridContainerStyled container direction="column" justify="space-around">
      <TypographyTituloStyled>{titulo}</TypographyTituloStyled>
      <TypographyParagrafoStyled>
        Entre na fila de espera para ser um investidor{' '}
        <strong>Crédito Express</strong>
      </TypographyParagrafoStyled>
      <TypographyFooterStyled>{subtitulo2}</TypographyFooterStyled>
    </GridContainerStyled>
  );
};

export default Background;
