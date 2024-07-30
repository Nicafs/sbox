import { css } from 'styled-components';

import fontFlexoSoftBold from '../../assets/fonts/durotype-flexosoft-bold.otf';
import fontFlexoSoftHeavy from '../../assets/fonts/durotype-flexosoft-heavy.otf';
import fontFlexoSoftLight from '../../assets/fonts/durotype-flexosoft-light.otf';
import fontFlexoSoftRegular from '../../assets/fonts/durotype-flexosoft-regular.otf';

export default css`
  @font-face {
    font-family: 'FlexoSoft';
    src: url('${fontFlexoSoftRegular}') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'FlexoSoft';
    src: url('${fontFlexoSoftBold}') format('opentype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'FlexoSoft';
    src: url('${fontFlexoSoftHeavy}') format('opentype');
    font-weight: bolder;
    font-style: normal;
  }

  @font-face {
    font-family: 'FlexoSoft';
    src: url('${fontFlexoSoftLight}') format('opentype');
    font-weight: lighter;
    font-style: normal;
  }
`;
