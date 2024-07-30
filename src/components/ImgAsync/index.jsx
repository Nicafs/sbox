import React, { useEffect, useState } from 'react';

import { getImageNotFoundUrl } from '../../commons/hooks/Firebase/storage';
import ImgAsyncLoader from './imgAsyncLoader';

export default function ImgAsync({ src, render: Render, onError, ...props }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    if (src) {
      const img = new Image();
      img.onload = () => {
        setData(img.src);
      };
      img.onerror = () => {
        if (onError) {
          onError(img);
        } else {
          img.src = getImageNotFoundUrl();
        }
        // Tratativa de erro aqui
      };
      img.src = src;
    }
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  if (data) {
    if (Render) {
      return <Render src={data} {...props} />;
    }
    return <img src={data} {...props} alt="Imagens" />;
  }
  return <ImgAsyncLoader {...props} />;
}
