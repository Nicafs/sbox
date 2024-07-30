import styled from 'styled-components';

import DialogContent from '@material-ui/core/DialogContent';

export const DialogContentStyled = styled(DialogContent)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0px;

    .MuiBox-root {
      padding: 0px 16px;
      margin-top: 16px;
    }
  }
`;
