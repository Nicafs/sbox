import styled from 'styled-components';

import Button from '../MaterialUI/Button';

const Icone = styled.img`
  width: 192px;
`;

const Texto = styled.p`
  font-size: 16px;
  text-align: center;
`;

const ButtonArrow = styled(Button)`
  width: 48px;
  height: 48px;
`;

export { Icone, Texto, ButtonArrow };
