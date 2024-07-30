import React from 'react';

import PropTypes from 'prop-types';

import UnderlineMenuSelector from '../../SeletorString';
import { HeaderAuthDiv, SelectedStyled } from './style';

const HeaderAuthItem = ({ titulo, name, onClick, selecionado }) => {
  return (
    <HeaderAuthDiv>
      <SelectedStyled
        name={name}
        underline="none"
        href="#"
        selecionado={selecionado.toString()}
        onClick={onClick}
      >
        {titulo}
      </SelectedStyled>
      {selecionado && <UnderlineMenuSelector name={name} />}
    </HeaderAuthDiv>
  );
};

HeaderAuthItem.propTypes = {
  titulo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selecionado: PropTypes.bool.isRequired,
};

export default HeaderAuthItem;
