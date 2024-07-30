import styled from 'styled-components';

import { fade } from '@material-ui/core/styles/colorManipulator';

import Paper from '../MaterialUI/Paper';
import Typography from '../MaterialUI/Typography';

export const BannerPaperStyled = styled(Paper)`
  color: ${({ theme }) => theme.palette.primary.dark};
  background-color: ${({ theme }) => fade(theme.palette.primary.main, 0.05)};
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(4)}px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
  text-align: justify;
`;

export const BannerIconStyled = styled.img`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  float: left;
  width: 64px;
`;

export const BannerTypographyStyled = styled(Typography)``;
