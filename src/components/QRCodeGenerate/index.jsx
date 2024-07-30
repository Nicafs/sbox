import React from 'react';

import TipoLogo from 'commons/enums/TipoLogo';
import { useAppGlobal } from 'providers/AppGlobal';
import QRCode from 'qrcode.react';

const QRCodeGenerate = ({ url }) => {
  const {
    actions: { getLogo },
  } = useAppGlobal();
  return (
    <QRCode
      value={url}
      size={300}
      bgColor="#ffffff"
      fgColor="#000000"
      level="H"
      includeMargin={false}
      renderAs="svg"
      imageSettings={{
        src: getLogo(TipoLogo.BRASAO_COLORIDO),
        x: undefined,
        y: undefined,
        height: 21,
        width: 100,
        excavate: true,
      }}
    />
  );
};

export default QRCodeGenerate;
