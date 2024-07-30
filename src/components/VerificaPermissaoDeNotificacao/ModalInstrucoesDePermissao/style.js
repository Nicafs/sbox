import Button from 'components/MaterialUI/Button';
import Container from 'components/MaterialUI/Container';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

import { Dialog } from '@material-ui/core';

export const TypographyInfoStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.white};
  line-height: 48px;
  font-size: 36px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    line-height: 44px;
    font-size: 28px;
  }
`;

export const TypographyTituloStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.white};
  font-weight: bold;
  font-size: 60px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 40px;
  }
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
