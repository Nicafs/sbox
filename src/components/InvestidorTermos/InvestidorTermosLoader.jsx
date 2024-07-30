import React from 'react';
import ContentLoader from 'react-content-loader';

import Grid from 'components/MaterialUI/Grid';

const InvestidorTermosLoader = () => (
  <Grid container justify="center" alignItems="center">
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="16" y="10" rx="0" ry="0" width="774" height="574" />
    </ContentLoader>
  </Grid>
);

export default InvestidorTermosLoader;
