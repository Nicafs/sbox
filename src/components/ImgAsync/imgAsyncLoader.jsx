import React from 'react';
import ContentLoader from 'react-content-loader';

export default function ImgAsyncLoader(props = {}) {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0%" y="0" rx="3" ry="3" width="100%" height="50" />
    </ContentLoader>
  );
}
