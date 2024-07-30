import Button from 'components/MaterialUI/Button';
import Card from 'components/MaterialUI/Card';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled, { css } from 'styled-components';

export const ImagemCliente = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
export const ImagemLogo = styled.img`
  width: 64px;
  border-radius: 4px;
  margin-right: 8px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 128px;
    margin: 15px 0px;
  }
`;
export const CardStyled = styled(Card)`
  cursor: pointer;
  transition: transform 0.2s ease-in;
  height: 100% !important;
  transition: 0.4s;
  padding: 20px;

  &:hover {
    transform: scale(1.02, 1.02);
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: initial;
  }

  ${({ selecionado }) =>
    selecionado &&
    css`
      border-width: 1.5px;
      border-style: solid;
      border-color: ${({ theme }) => theme.palette.primary.dark};
    `}
`;
export const GridLogoStyled = styled(Grid)`
  height: 100%;
`;
export const ButtonAdicionarStyled = styled(Button)`
  height: unset;
  background: ${({ theme }) => theme.palette.primary.light}10;
  border-color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 12px;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
    color: ${({ theme }) => theme.palette.common.white};
  }
`;
export const ButtonAdicionarIcone = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 4px;
`;
export const TypographyButtonStyled = styled(Typography)`
  font-weight: bold;
  text-transform: capitalize;
`;
