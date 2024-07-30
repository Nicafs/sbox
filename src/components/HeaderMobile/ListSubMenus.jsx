import React from 'react';

import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { itensMenuCentral } from '../../commons/constants/menus';

const ListaSubMenus = ({
  menuSelecionado,
  subMenuSelecionado,
  handleMudancaSubMenu,
}) => (
  <List component="nav">
    {itensMenuCentral
      .filter(it => it.id === menuSelecionado)
      .flatMap(({ subMenus }) => subMenus)
      .map(it => (
        <ListItem
          key={it.id}
          button
          selected={it.id === subMenuSelecionado}
          onClick={event => handleMudancaSubMenu(event, it.id)}
        >
          <ListItemText primary={it.titulo} />
        </ListItem>
      ))}
  </List>
);

ListaSubMenus.propTypes = {
  menuSelecionado: PropTypes.number.isRequired,
  subMenuSelecionado: PropTypes.number.isRequired,
  handleMudancaSubMenu: PropTypes.func.isRequired,
};

export default ListaSubMenus;
