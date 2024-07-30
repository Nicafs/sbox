import styled from 'styled-components';

import Grid from '../MaterialUI/Grid';
import Paper from '../MaterialUI/Paper';
import Typography from '../MaterialUI/Typography';

export const MainPaperStyled = styled(Paper)`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(7)}px;
  padding-left: ${({ theme }) => theme.spacing(30)}px;
  padding-right: ${({ theme }) => theme.spacing(30)}px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
    padding: ${({ theme }) => theme.spacing(3)}px
      ${({ theme }) => theme.spacing(1)}px;
  }
`;

export const NomeTypographyStyled = styled(Typography)`
  color: black;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

export const BemVindoTypographyStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const CorpoTypographyStyled = styled(Typography)``;

export const LinkBoletoTypographyStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
`;

export const GridButtonsStyled = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`;

export const GridButtonInvestirStyled = styled(Grid)`
  text-align: right;
  ${({ theme }) => theme.breakpoints.down('xs')} {
    text-align: center;
    // & > button {
    //   width: 100%;
    // }
  }
`;

export const GridButtonAcompanharStyled = styled(Grid)`
  text-align: left;
  ${({ theme }) => theme.breakpoints.down('xs')} {
    text-align: center;
    // & > button {
    //   width: 100%;
    // }
  }
`;
