import styled from 'styled-components';

import Link from '@material-ui/core/Link';

export const HeaderAuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  align-items: center;
`;

export const SelectedStyled = styled(Link)`
  color: ${({ theme, selecionado }) =>
    selecionado === 'true'
      ? theme.palette.primary.selected
      : theme.palette.primary.unselected};
  text-decoration: none;
  @media (min-device-width: 1600px) {
    font-size: 3em;
  }
  @media (min-device-width: 1024px) {
    font-size: 1.6em;
  }
  @media (max-device-width: 1024px) {
    font-size: 2em;
  }
`;
