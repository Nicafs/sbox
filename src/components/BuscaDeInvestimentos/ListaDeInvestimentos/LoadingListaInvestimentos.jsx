import React from 'react';
import ContentLoader from 'react-content-loader';

import Card from 'components/MaterialUI/Card';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import styled from 'styled-components';

export const CardStyled = styled(Card)`
  cursor: pointer;
  //height: 100% !important;
  transition: 0.4s;
  padding: 20px;
  margin: 5px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: initial;
  }
`;

const CardInvestimenLoader = () => (
  // feito no http://danilowoz.com/create-content-loader/
  <CardStyled>
    <Hidden smDown>
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox="0 0 450 372"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="40%" y="16" rx="3" ry="3" width="25%" height="71" />
        <rect x="0%" y="135" rx="0" ry="0" width="70%" height="8" />
        <rect x="0%" y="160" rx="0" ry="0" width="40%" height="8" />
        <rect x="0" y="209" rx="3" ry="3" width="100%" height="139" />
      </ContentLoader>
    </Hidden>
    <Hidden mdUp>
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox="0 0 314 290"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="40%" y="14" rx="3" ry="3" width="25%" height="71" />
        <rect x="5%" y="111" rx="0" ry="0" width="70%" height="8" />
        <rect x="5%" y="136" rx="0" ry="0" width="40%" height="8" />
        <rect x="5%" y="183" rx="3" ry="3" width="90%" height="101" />
      </ContentLoader>
    </Hidden>
  </CardStyled>
);

export default function LoadingListaInvestimentos() {
  return (
    <Grid container justify="center" spacing={2}>
      {[...Array(10).keys()].map(i => (
        <Grid item xs={12} md={4}>
          <CardInvestimenLoader key={i} />
        </Grid>
      ))}
    </Grid>
  );
}
