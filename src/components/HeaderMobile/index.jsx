import React from 'react';

import TipoLogo from 'commons/enums/TipoLogo';
import AppBar from 'components/MaterialUI/AppBar';
import Toolbar from 'components/MaterialUI/Toolbar';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useAppGlobal } from '../../providers/AppGlobal';
import Grid from '../MaterialUI/Grid';
import Drawer from './Drawer';
import DrawerConteudo from './DrawerConteudo';
import { HeaderStyledFix, LogoHeaderStyled, MenuIconStyled } from './style';

const HeaderMobile = ({
  pessoa,
  handlerLogout,
  subMenuComponent,
  itensDrawer,
  menuSelecionadoIdx,
  loadingMenu,
}) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const { signout: logout } = useAuth({});
  const {
    actions: { getLogo },
  } = useAppGlobal();

  const handleDrawer = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    if (open) setOpen(false);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar elevation={0} style={{ height: '48px' }}>
        <Toolbar style={{ minHeight: '48px' }}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container justify="flex-start" alignContent="center">
                <MenuIconStyled fontSize="large" onClick={handleDrawer} />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justify="flex-end" alignContent="center">
                {subMenuComponent || (
                  <LogoHeaderStyled
                    src={getLogo(TipoLogo.BRASAO_MONOCROMATICO)}
                    onClick={handleClick}
                  />
                )}
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handlerLogout}>Sair</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <HeaderStyledFix />
      <Drawer pessoa={pessoa} closeFn={handleDrawerClose} open={open}>
        <DrawerConteudo
          menuSelecionadoIdx={menuSelecionadoIdx}
          itens={itensDrawer}
          logoutFn={handlerLogout}
          loadingMenu={loadingMenu}
        />
      </Drawer>
    </React.Fragment>
  );
};

/* eslint-disable react/forbid-prop-types */
HeaderMobile.propTypes = {
  pessoa: PropTypes.object,
  handlerLogout: PropTypes.func.isRequired,
};

HeaderMobile.defaultProps = {
  pessoa: {},
};

export default HeaderMobile;
