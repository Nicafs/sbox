import React from 'react';

import LoaderCircular from 'components/LoaderCircular';
import Grid from 'components/MaterialUI/Grid';
import PropTypes from 'prop-types';

import { DialogContent } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import {
  TypographyInfoStyled,
  ContentContainer,
  DialogStyled,
  ButtonStyled,
  TypographyTituloStyled,
} from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalInstrucoesDePermissao({
  titulo,
  info,
  handlePermissao,
  loading,
}) {
  return (
    <DialogStyled fullScreen open TransitionComponent={Transition}>
      <DialogContent>
        <ContentContainer maxWidth="md">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <TypographyTituloStyled variant="h1" align="center">
                {titulo}
              </TypographyTituloStyled>
            </Grid>
            <Grid item xs={12}>
              <TypographyInfoStyled variant="h4" align="center">
                {info}
              </TypographyInfoStyled>
            </Grid>
            <Grid item>
              {loading ? (
                <LoaderCircular />
              ) : (
                <ButtonStyled primary rounded onClick={handlePermissao}>
                  OK, ENTENDI
                </ButtonStyled>
              )}
            </Grid>
          </Grid>
        </ContentContainer>
      </DialogContent>
    </DialogStyled>
  );
}

ModalInstrucoesDePermissao.propTypes = {
  titulo: PropTypes.node.isRequired,
  info: PropTypes.node.isRequired,
  handlePermissao: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
