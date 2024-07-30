import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';

export const AvisosExpressao = styled(Grid)`
  background: ${({ theme }) => fade(theme.palette.primary.main, 0.5)};
  color: white;
  position: absolute;
  width: 250px;
  top: 12px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  border-radius: 5px;

  @media only screen and (max-width: 600px) {
    top: 25px;
    width: 160px;
  }
`;
