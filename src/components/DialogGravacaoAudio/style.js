import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

export const GridHeaderStyled = styled(Grid)`
  padding-top: ${({ theme }) => theme.spacing(4)}px;
`;

export const MicIconImgStyled = styled.img`
  color: ${({ theme }) => theme.palette.primary.main};
  width: ${({ theme }) => theme.spacing(4)}px;
  height: ${({ theme }) => theme.spacing(4)}px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: ${({ theme }) => theme.spacing(3.5)}px;
    height: ${({ theme }) => theme.spacing(3.5)}px;
  }
`;

export const TypographyTitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  font-size: ${({ theme }) => theme.spacing(4)}px;
  padding: 0px;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  line-height: 1;
  @media (max-width: 320px) {
    font-size: ${({ theme }) => theme.spacing(3.5)}px;
  }
`;

export const TypographySubtitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]};
  text-align: center;
  font-weight: bold;
  font-size: ${({ theme }) => theme.spacing(2)}px;
  padding-top: ${({ theme }) => theme.spacing(1)}px;
`;

export const CloseIconStyled = styled(CloseIcon)`
  width: ${({ theme }) => theme.spacing(4)}px;
  height: ${({ theme }) => theme.spacing(4)}px;
`;

export const GridDialogStyled = styled(Grid)`
  padding-left: 10%;
  padding-right: 10%;
`;

export const DialogContentStyled = styled(DialogContent)`
  background: rgba(0, 0, 0, 0.05);
  padding: 15px;
  border-radius: 16px;
  margin-top: 16px;
  font-style: italic;
`;

export const ButtonStyled = styled(Button)`
  color: #fff;
  border-radius: ${({ theme }) => theme.spacing(3)}px;
  font-size: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;
