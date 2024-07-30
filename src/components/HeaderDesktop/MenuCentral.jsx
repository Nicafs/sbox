import React from 'react';

import PropTypes from 'prop-types';

import Link from '@material-ui/core/Link';

import { itensMenuCentral } from '../../commons/constants/menus';
import Grid from '../MaterialUI/Grid';
import { DivMenuItemStyled, GridMenuItensStyled } from './style';

const MenuCentralItem = ({ selecionado, titulo, icon, handlerMudancaMenu }) => (
  <React.Fragment>
    <Link href="#" onClick={() => handlerMudancaMenu()} underline="none">
      <DivMenuItemStyled selecionado={selecionado}>
        {icon}&nbsp;&nbsp;<span>{titulo}</span>
      </DivMenuItemStyled>
    </Link>
  </React.Fragment>
);

/* eslint-disable react/forbid-prop-types */
MenuCentralItem.propTypes = {
  selecionado: PropTypes.bool.isRequired,
  titulo: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  handlerMudancaMenu: PropTypes.func.isRequired,
};

const MenuCentral = ({ menuSelecionado, handlerMudancaMenu }) => (
  <GridMenuItensStyled container wrap="nowrap">
    {itensMenuCentral.map(({ titulo, rota, icon, id }) => (
      <Grid item container justify="center" alignItems="center" key={id}>
        <MenuCentralItem
          icon={icon}
          titulo={titulo}
          rota={rota}
          selecionado={id === menuSelecionado}
          handlerMudancaMenu={handlerMudancaMenu}
        />
      </Grid>
    ))}
  </GridMenuItensStyled>
);

MenuCentral.propTypes = {
  menuSelecionado: PropTypes.number.isRequired,
  handlerMudancaMenu: PropTypes.func.isRequired,
};

export default MenuCentral;
