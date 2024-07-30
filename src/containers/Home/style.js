import styled from 'styled-components';

import devices from '../../commons/constants/devices';
import Container from '../../components/MaterialUI/Container';

const ContainerPrincipalStyled = styled(Container).attrs(props => ({
  ...props,
}))`
  padding: 0;

  @media ${devices.mobile} {
    padding: 10px;
  }
`;

const Titulo = styled.h1`
  color: black;
  font-size: 26px;
  font-weight: normal;
`;

export { ContainerPrincipalStyled, Titulo };
