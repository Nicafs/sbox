import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const TituloTypographyStyled = styled(Typography)``;

export const CifraoTypographyStyled = styled(Typography)`
  display: inline-block;
  color: black;
  font-weight: 400;
`;

export const ValorTypographyStyled = styled(Typography)`
  display: inline-block;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  color: ${({ theme, isblack }) =>
    isblack === 'true' ? 'black' : theme.palette.primary.dark};
  font-weight: bold;
`;
