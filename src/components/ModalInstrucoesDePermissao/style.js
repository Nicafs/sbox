import Button from 'components/MaterialUI/Button';
import Container from 'components/MaterialUI/Container';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

import { Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const TypographyInfoStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.white};
`;

export const TypographyTituloStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.white};
  font-weight: bold;
`;

export const ContentContainer = styled(Container)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-weight: bold;
  line-height: 60px;
`;

export const TypographyErroStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.error.dark};
`;

export const DialogStyled = styled(Dialog)`
  .MuiPaper-root.MuiDialog-paper {
    background-color: unset;
  }

  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.85);
  }
`;

export const ButtonStyled = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
`;

export const CloseIconStyled = styled(CloseIcon)`
  color: ${({ theme }) => theme.palette.common.white};
`;
