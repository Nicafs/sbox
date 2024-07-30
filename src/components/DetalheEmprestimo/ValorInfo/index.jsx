import React from 'react';

import { moneyMask } from 'commons/utils/MaskHandle';

import { TypographyBlackStyled } from './style';

export default function ValorInfo({ label, valor }) {
  return (
    <>
      <TypographyBlackStyled variant="h6">{label}</TypographyBlackStyled>
      {valor && (
        <TypographyBlackStyled variant="h4">
          {valor === null ? 'CALCULANDO...' : `R$ ${moneyMask(valor)}`}
        </TypographyBlackStyled>
      )}
    </>
  );
}
