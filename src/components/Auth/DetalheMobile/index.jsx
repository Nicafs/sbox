import React from 'react';

import { useAppGlobal } from 'providers/AppGlobal';

import {
  HeaderMobileStyled,
  HeaderTextStyled,
  ArrowBackIconStyled,
} from './style';

const DetalheMobile = ({ btnBackClickHandler }) => {
  const {
    actions: { getTextoOrganizacao },
  } = useAppGlobal();

  const { mobile } = getTextoOrganizacao();

  return (
    <HeaderMobileStyled>
      {btnBackClickHandler && (
        <ArrowBackIconStyled onClick={btnBackClickHandler} />
      )}
      <HeaderTextStyled>{mobile}</HeaderTextStyled>
    </HeaderMobileStyled>
  );
};

export default DetalheMobile;
