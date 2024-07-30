import devices from 'commons/constants/devices';
import styled, { css } from 'styled-components';

import { Container as ContainerUI } from '@material-ui/core';

const Container = styled(ContainerUI)`
  ${({ principal }) =>
    principal &&
    css`
      margin-top: 50px;
      overflow: hidden;

      @media ${devices.mobile} {
        margin-top: 10px;
      }
    `}
`;

export default Container;
