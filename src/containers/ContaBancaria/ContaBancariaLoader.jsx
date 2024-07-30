import React from 'react';
import ContentLoader from 'react-content-loader';

import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';

export default function ContaBancariaLoader() {
  const renderMobile = () => (
    <Grid container justify="center">
      <Grid item md={6}>
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 400 600"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="10%" y="5%" width="25%" height="1%" rx="10" ry="10" />
          <rect x="10%" y="8%" width="35%" height="10%" rx="10" ry="10" />
          <rect x="55%" y="8%" width="35%" height="10%" rx="10" ry="10" />

          <rect x="10%" y="25%" width="35%" height="1%" rx="4" ry="4" />
          <rect x="10%" y="28%" width="80%" height="10%" rx="4" ry="4" />

          <rect x="10%" y="45%" width="35%" height="1%" rx="4" ry="4" />
          <rect x="10%" y="48%" width="60%" height="10%" rx="4" ry="4" />

          <rect x="10%" y="65%" width="35%" height="1%" rx="4" ry="4" />
          <rect x="10%" y="68%" width="60%" height="10%" rx="4" ry="4" />
        </ContentLoader>
      </Grid>
    </Grid>
  );

  const renderDesktop = () => (
    <Grid container>
      <Grid item md={6}>
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 400 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="11%" y="10%" width="15%" height="2" />
          <rect x="10%" y="13%" width="20%" height="20" rx="10" ry="10" />
          <rect x="32%" y="13%" width="20%" height="20" rx="10" ry="10" />

          <rect x="11%" y="33%" width="10%" height="2" />
          <rect x="10%" y="36%" width="90%" height="30" rx="10" ry="10" />

          <rect x="11%" y="60%" width="10%" height="2" />
          <rect x="10%" y="63%" width="30%" height="30" rx="10" ry="10" />

          <rect x="51%" y="60%" width="10%" height="2" />
          <rect x="50%" y="63%" width="30%" height="30" rx="10" ry="10" />
        </ContentLoader>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Hidden mdDown>{renderDesktop()}</Hidden>
      <Hidden mdUp>{renderMobile()}</Hidden>
    </>
  );
}
