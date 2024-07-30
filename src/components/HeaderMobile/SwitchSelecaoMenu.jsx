import React from 'react';

import PropTypes from 'prop-types';

import { itensMenuCentral } from '../../commons/constants/menus';
import { DivSeletor1Styled } from './style';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
const SwitchSelecaoMenu = ({ menuSelecionado, handlerMudancaMenu }) => (
  <div className="divSeletor0" onClick={handlerMudancaMenu}>
    {itensMenuCentral.map(it => (
      <DivSeletor1Styled key={it.id} selecionado={it.id === menuSelecionado}>
        <div className="iconDiv"> {it.icon}</div>
        {it.titulo.replace(' ', '\n')}
      </DivSeletor1Styled>
    ))}
  </div>
);

SwitchSelecaoMenu.propTypes = {
  menuSelecionado: PropTypes.number.isRequired,
  handlerMudancaMenu: PropTypes.func.isRequired,
};

export default SwitchSelecaoMenu;
