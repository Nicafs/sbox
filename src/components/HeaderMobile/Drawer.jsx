import React from 'react';

import PropTypes from 'prop-types';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Grid from '../MaterialUI/Grid';
import DadosPessoaInDrawer from './DadosPessoaInDrawer';
import { DrawerStyled, GreenDivStyled, MainGridDrawerStyled } from './style';

const Drawer = ({ pessoa, closeFn, open, children }) => (
  <ClickAwayListener
    onClickAway={closeFn}
    mouseEvent="onMouseUp"
    touchEvent="onTouchEnd"
  >
    <DrawerStyled
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: 'drawerPaper',
      }}
    >
      <MainGridDrawerStyled container>
        <GreenDivStyled>
          <Grid item container justify="flex-start">
            <DadosPessoaInDrawer pessoa={pessoa || {}} />
          </Grid>
        </GreenDivStyled>
        <Grid item>{children}</Grid>
      </MainGridDrawerStyled>
    </DrawerStyled>
  </ClickAwayListener>
);

Drawer.propTypes = {
  pessoa: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired,
};

export default Drawer;
