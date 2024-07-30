import React from 'react';

import PropTypes from 'prop-types';

import Link from '@material-ui/core/Link';

import { itensMenuCentral } from '../../commons/constants/menus';
import Grid from '../MaterialUI/Grid';
import UnderlineMenuSelector from '../SeletorString';
import { BoxSubMenu, DivUnderlineSelectorItemStyled } from './style';

const SubMenuItem = ({ selecionado, titulo, id, handleMudancaSubMenu }) => (
  <DivUnderlineSelectorItemStyled selecionado={selecionado}>
    <Link
      underline="none"
      href="#"
      onClick={event => handleMudancaSubMenu(event, id)}
    >
      {titulo}
    </Link>
    {selecionado && (
      <div className="selector">
        <UnderlineMenuSelector className="selector" />
      </div>
    )}
  </DivUnderlineSelectorItemStyled>
);

SubMenuItem.propTypes = {
  selecionado: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleMudancaSubMenu: PropTypes.func.isRequired,
  titulo: PropTypes.string.isRequired,
};

const SubMenu = ({
  menuSelecionado,
  subMenuSelecionado,
  handleMudancaSubMenu,
}) => (
  <BoxSubMenu boxShadow={4}>
    <Grid container spacing={4}>
      {itensMenuCentral
        .filter(it => it.id === menuSelecionado)
        .flatMap(it => it.subMenus)
        .map(({ titulo, rota, id }) => (
          <Grid item key={id}>
            <SubMenuItem
              id={id}
              titulo={titulo}
              rota={rota}
              selecionado={id === subMenuSelecionado}
              handleMudancaSubMenu={handleMudancaSubMenu}
            />
          </Grid>
        ))}
    </Grid>
  </BoxSubMenu>
);

SubMenu.propTypes = {
  menuSelecionado: PropTypes.number.isRequired,
  subMenuSelecionado: PropTypes.number.isRequired,
  handleMudancaSubMenu: PropTypes.func.isRequired,
};

export default SubMenu;
