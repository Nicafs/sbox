import Paper from 'components/MaterialUI/Paper';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const MainPaperStyled = styled(Paper)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(7)}px;
  padding-left: ${({ theme }) => theme.spacing(20)}px;
  padding-right: ${({ theme }) => theme.spacing(20)}px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`;

export const NomeTypographyStyled = styled(Typography)`
  color: black;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

export const CorpoTypographyStyled = styled(Typography)``;
