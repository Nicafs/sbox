import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 1600 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="203" y="326" rx="0" ry="0" width="1" height="0" />
    <rect x="22" y="33" rx="0" ry="0" width="1022" height="44" />
    <rect x="26" y="134" rx="0" ry="0" width="226" height="25" />
    <rect x="24" y="197" rx="0" ry="0" width="1554" height="26" />
    <rect x="25" y="234" rx="0" ry="0" width="422" height="25" />
    <rect x="24" y="293" rx="0" ry="0" width="871" height="26" />
    <rect x="21" y="352" rx="0" ry="0" width="1452" height="27" />
    <rect x="24" y="414" rx="0" ry="0" width="943" height="24" />
    <rect x="23" y="476" rx="0" ry="0" width="710" height="27" />
  </ContentLoader>
);

export default Loader;
