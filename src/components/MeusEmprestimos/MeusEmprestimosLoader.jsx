import React from 'react';
import ContentLoader from 'react-content-loader';

import { Hidden } from '@material-ui/core';

const MeusEmprestimosLoaderDesktop = () => (
  <ContentLoader
    speed={1}
    viewBox="0 0 800 600"
    backgroundColor="#dbdbdb"
    foregroundColor="#d0cece"
    style={{ width: '100%' }}
    name="skeleton"
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="5%" />
    <rect x="15%" y="10%" rx="0" ry="0" width="20%" height="2.5%" />
    <rect x="15%" y="15%" rx="0" ry="0" width="70%" height="40%" />
    Resumo/stepper
    <rect x="15%" y="60%" rx="0" ry="0" width="25%" height="2.5%" />
    <rect x="15%" y="65%" rx="0" ry="0" width="70%" height="2.5%" />
    <rect x="15%" y="70%" rx="0" ry="0" width="70%" height="2.5%" />
    <rect x="15%" y="75%" rx="0" ry="0" width="70%" height="2.5%" />
  </ContentLoader>
);

const MeusEmprestimosLoaderMobile = () => (
  <ContentLoader
    speed={1}
    viewBox="0 0 375 812"
    backgroundColor="#dbdbdb"
    foregroundColor="#d0cece"
    name="skeleton"
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="10%" />
    <rect x="10%" y="15%" rx="0" ry="0" width="20%" height="1.5%" />
    <rect x="10%" y="20%" rx="0" ry="0" width="80%" height="40%" />
    Resumo/stepper
    <rect x="10%" y="65%" rx="0" ry="0" width="25%" height="1.5%" />
    <rect x="10%" y="70%" rx="0" ry="0" width="80%" height="2.5%" />
    <rect x="10%" y="75%" rx="0" ry="0" width="80%" height="2.5%" />
    <rect x="10%" y="80%" rx="0" ry="0" width="80%" height="2.5%" />
    <rect x="10%" y="85%" rx="0" ry="0" width="80%" height="2.5%" />
  </ContentLoader>
);

const MeusEmprestimosLoader = () => (
  <>
    <Hidden smDown>
      <MeusEmprestimosLoaderDesktop />
    </Hidden>
    <Hidden smUp>
      <MeusEmprestimosLoaderMobile />
    </Hidden>
  </>
);

export default MeusEmprestimosLoader;
