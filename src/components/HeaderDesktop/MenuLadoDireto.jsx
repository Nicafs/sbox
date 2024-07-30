import React from 'react';

import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import SaldoEmConta from '../Header/Saldo';
import Grid from '../MaterialUI/Grid';
import { AvatarStyled, GridMenuItensStyled } from './style';

const MenuLadoDireto = ({ pessoa, handlerLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <GridMenuItensStyled container>
      <Grid item md={6}>
        <SaldoEmConta saldo={pessoa.saldo ? pessoa.saldo : 1} />
      </Grid>

      <Grid item md={2} container justify="center" alignItems="center">
        <NotificationsNoneIcon fontSize="large" />
      </Grid>

      <Grid item md={4} container alignItems="center" justify="flex-start">
        <AvatarStyled
          cy-element="avatar"
          src={pessoa.avatarUrl}
          onClick={handleClick}
        >
          {!pessoa.nome && 'C'}
          {pessoa.nome && !pessoa.avatarUrl && pessoa.nome[0].toUpperCase()}
        </AvatarStyled>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem cy-element="btnSair" onClick={handlerLogout}>
            Sair
          </MenuItem>
        </Menu>
      </Grid>
    </GridMenuItensStyled>
  );
};

/* eslint-disable react/forbid-prop-types */
MenuLadoDireto.propTypes = {
  pessoa: PropTypes.object,
  handlerLogout: PropTypes.func.isRequired,
};

MenuLadoDireto.defaultProps = {
  pessoa: {
    nome: 'null',
    avatarUrl: '#',
    saldo: 0,
  },
};

export default MenuLadoDireto;
