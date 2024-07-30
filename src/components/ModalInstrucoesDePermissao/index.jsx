import React from 'react';

import Grid from 'components/MaterialUI/Grid';

import { DialogContent, IconButton } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import {
  TypographyInfoStyled,
  ContentContainer,
  TypographyErroStyled,
  DialogStyled,
  ButtonStyled,
  TypographyTituloStyled,
  CloseIconStyled,
} from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalInstrucoesDePermissao({
  titulo,
  renderInfo,
  erro,
  solicitaPermissao,
  open = true,
}) {
  return (
    <DialogStyled fullScreen open={open} TransitionComponent={Transition}>
      <DialogContent>
        {erro && (
          <IconButton style={{ position: 'fixed' }}>
            <CloseIconStyled />
          </IconButton>
        )}
        <ContentContainer maxWidth="md">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <TypographyTituloStyled variant="h5" align="center">
                {titulo}
              </TypographyTituloStyled>
            </Grid>
            <Grid item xs={12}>
              {erro ? (
                <TypographyErroStyled variant="h6" align="center">
                  Infelizmente não foi possível continuar pois você não permitiu
                  acesso ao dispositivo. Acesse as configurações do seu
                  navegador e conceda permissão ou continue por outro
                  dispositivo.
                </TypographyErroStyled>
              ) : (
                <>
                  <TypographyInfoStyled variant="h6" align="center">
                    {renderInfo}
                  </TypographyInfoStyled>
                  <Grid container justify="center" spacing={2}>
                    <Grid item>
                      <ButtonStyled primary rounded onClick={solicitaPermissao}>
                        OK, ENTENDI
                      </ButtonStyled>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </ContentContainer>
      </DialogContent>
    </DialogStyled>
  );
}
