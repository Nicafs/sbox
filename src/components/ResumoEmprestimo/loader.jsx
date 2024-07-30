import React from 'react';
import ContentLoader from 'react-content-loader';

import { CardStyled } from './style';

export default function ResumoEmprestimoLoader({ resumoRef }) {
  return (
    <CardStyled ref={resumoRef}>
      <ContentLoader viewBox="0 0 300 600" height="100%" width="100%" speed={1}>
        <rect x="7" y="13" rx="0" ry="0" width="85" height="14" />
        <rect x="8" y="43" rx="0" ry="0" width="219" height="17" />
        <rect x="10" y="82" rx="0" ry="0" width="80" height="13" />
        <rect x="11" y="108" rx="0" ry="0" width="27" height="9" />
        <rect x="230" y="83" rx="0" ry="0" width="56" height="11" />
        <rect x="12" y="128" rx="0" ry="0" width="278" height="1" />
        <rect x="9" y="139" rx="0" ry="0" width="80" height="13" />
        <rect x="10" y="165" rx="0" ry="0" width="27" height="9" />
        <rect x="229" y="140" rx="0" ry="0" width="56" height="11" />
        <rect x="11" y="185" rx="0" ry="0" width="278" height="1" />
        <rect x="9" y="198" rx="0" ry="0" width="80" height="13" />
        <rect x="10" y="224" rx="0" ry="0" width="27" height="9" />
        <rect x="229" y="199" rx="0" ry="0" width="56" height="11" />
        <rect x="11" y="244" rx="0" ry="0" width="278" height="1" />
        <rect x="11" y="259" rx="0" ry="0" width="80" height="13" />
        <rect x="12" y="285" rx="0" ry="0" width="27" height="9" />
        <rect x="231" y="260" rx="0" ry="0" width="56" height="11" />
        <rect x="13" y="305" rx="0" ry="0" width="278" height="1" />
        <rect x="9" y="319" rx="0" ry="0" width="80" height="13" />
        <rect x="10" y="345" rx="0" ry="0" width="27" height="9" />
        <rect x="229" y="320" rx="0" ry="0" width="56" height="11" />
        <rect x="11" y="365" rx="0" ry="0" width="278" height="1" />
        <rect x="9" y="380" rx="0" ry="0" width="80" height="13" />
        <rect x="10" y="406" rx="0" ry="0" width="27" height="9" />
        <rect x="229" y="381" rx="0" ry="0" width="56" height="11" />
        <rect x="11" y="426" rx="0" ry="0" width="278" height="1" />
        <rect x="9" y="439" rx="0" ry="0" width="80" height="13" />
        <rect x="10" y="465" rx="0" ry="0" width="27" height="9" />
        <rect x="229" y="440" rx="0" ry="0" width="56" height="11" />
        <rect x="11" y="485" rx="0" ry="0" width="278" height="1" />
        <rect x="11" y="501" rx="0" ry="0" width="80" height="13" />
        <rect x="12" y="527" rx="0" ry="0" width="27" height="9" />
        <rect x="231" y="502" rx="0" ry="0" width="56" height="11" />
        <rect x="13" y="547" rx="0" ry="0" width="278" height="1" />
        <rect x="11" y="567" rx="0" ry="0" width="138" height="14" />
        <rect x="206" y="567" rx="0" ry="0" width="80" height="15" />
      </ContentLoader>
    </CardStyled>
  );
}
