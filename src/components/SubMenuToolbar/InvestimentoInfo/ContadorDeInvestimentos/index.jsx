import React from 'react';

import PorcoAsset from 'assets/images/porco-branco.svg';
import Badge from 'components/MaterialUI/Badge';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import { useAppGlobal } from 'providers/AppGlobal';

import { GridContainer, Icone, TypographyContadorStyled } from './style';

export default function ContadorDeInvestimentos({ qtdInvestimentos }) {
  const {
    actions: { getIcone },
  } = useAppGlobal();
  return (
    <GridContainer container name="porco-contador-investimentos">
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        spacing={qtdInvestimentos ? 1 : 0}
      >
        <Grid item style={{ display: 'flex' }} alignItems="center">
          <Hidden smDown>
            <Icone src={getIcone('icon-button-porco-verde')} />
          </Hidden>
          <Hidden mdUp>
            <Badge badgeContent={qtdInvestimentos} color="secondary">
              <Icone src={PorcoAsset} />
            </Badge>
          </Hidden>
        </Grid>
        <Hidden smDown>
          {qtdInvestimentos && qtdInvestimentos > 0 && (
            <Grid item>
              <TypographyContadorStyled variant="body1" color="textPrimary">
                {qtdInvestimentos}
              </TypographyContadorStyled>
            </Grid>
          )}
        </Hidden>
      </Grid>
    </GridContainer>
  );
}
