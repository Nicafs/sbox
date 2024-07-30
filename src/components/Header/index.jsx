import React from 'react';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';

import { Hidden } from '@material-ui/core';

import HeaderDesktop from '../HeaderDesktop';
import HeaderMobile from '../HeaderMobile';

const Header = ({
  pessoa,
  subMenuComponent,
  menuSelecionadoIdx,
  elevation,
  menu,
  loadingMenu,
  logout,
}) => {
  const desktopHeaderComSubmenuHeight = 128;
  const desktopHeaderHeight = 60;

  return (
    <>
      <Hidden mdDown>
        <div
          style={{
            height:
              menu && menu.length
                ? desktopHeaderComSubmenuHeight
                : desktopHeaderHeight,
          }}
        >
          <HeaderDesktop
            elevation={elevation}
            pessoa={pessoa}
            handlerLogout={logout}
            subMenuComponent={subMenuComponent}
            menu={menu}
            menuSelecionadoIdx={menuSelecionadoIdx}
            loadingMenu={loadingMenu}
          />
        </div>
      </Hidden>
      <Hidden lgUp>
        <HeaderMobile
          elevation={elevation}
          pessoa={pessoa}
          handlerLogout={logout}
          subMenuComponent={subMenuComponent}
          itensDrawer={menu}
          menuSelecionadoIdx={menuSelecionadoIdx}
          loadingMenu={loadingMenu}
        />
        <Hidden mdDown>
          <div style={{ height: 30 }} />
        </Hidden>
      </Hidden>
    </>
  );
};

/* eslint-disable react/forbid-prop-types */
Header.propTypes = {
  pessoa: PropTypes.object,
  elevation: PropTypes.number,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      titulo: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      iconeComponente: PropTypes.any,
      inserirDivisao: PropTypes.bool,
    }),
  ),
};

Header.defaultProps = {
  pessoa: {},
  elevation: 4,
  menu: [],
};

export default withRouter(Header);
