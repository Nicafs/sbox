// import logoCE from '../../assets/images/logo_alfa.svg';
import React, { useEffect, useState, useRef } from 'react';

import AppBar from 'components/MaterialUI/AppBar';
import Toolbar from 'components/MaterialUI/Toolbar';
import SubMenuToolbar from 'components/SubMenuToolbar';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import { CircularProgress, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import TipoLogo from '../../commons/enums/TipoLogo';
import { AvatarStyled, LogoHeaderStyled } from './style';

const HeaderDesktop = ({
  pessoa,
  handlerLogout,
  subMenuComponent,
  elevation,
  menu,
  menuSelecionadoIdx,
  loadingMenu,
}) => {
  const {
    actions: { getLogo },
  } = useAppGlobal();
  const [logo, setLogo] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    getLogoOrganizacao();

    return () => {
      isMountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getLogoOrganizacao = async () => {
    const logoOrganizacao = await getLogo(TipoLogo.LOGO_MONOCROMATICA);
    if (isMountedRef.current) {
      setLogo(logoOrganizacao);
    }
  };

  const currentVersion = window.localStorage.getItem('appVersion');

  return (
    <>
      <AppBar elevation={elevation}>
        <Toolbar>
          {logo ? (
            <LogoHeaderStyled src={getLogo(TipoLogo.BRASAO_MONOCROMATICO)} />
          ) : (
            <CircularProgress color="secondary" />
          )}

          <div style={{ right: 0, position: 'absolute' }}>
            <AvatarStyled
              cy-element="avatar"
              src={pessoa.avatarUrl}
              onClick={event => setAnchorEl(event.currentTarget)}
            >
              {!pessoa.nome && 'CE'}
              {pessoa.nome && !pessoa.avatarUrl && pessoa.nome[0].toUpperCase()}
            </AvatarStyled>
            <Menu
              style={{ textAlign: 'center' }}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem cy-element="btnSair" onClick={handlerLogout}>
                Sair
              </MenuItem>
              <Typography color="textSecondary" variant="subtitle1">
                v{currentVersion}
              </Typography>
            </Menu>
          </div>
        </Toolbar>
        {menu && menu.length > 0 && (
          <SubMenuToolbar
            loading={loadingMenu}
            menuSelecionadoIdx={menuSelecionadoIdx}
            menu={menu}
            rightComponent={subMenuComponent}
          />
        )}
      </AppBar>
    </>
  );
};

/* eslint-disable react/forbid-prop-types */
HeaderDesktop.propTypes = {
  pessoa: PropTypes.object,
  elevation: PropTypes.number,
  handlerLogout: PropTypes.func.isRequired,
};

HeaderDesktop.defaultProps = {
  pessoa: {},
  elevation: 4,
};

export default HeaderDesktop;
