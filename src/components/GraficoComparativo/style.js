import Grid from 'components/MaterialUI/Grid';
// import { green } from 'components/MaterialUI/Colors';
import Typography from 'components/MaterialUI/Typography';
import styled, { css } from 'styled-components';

// titulo1: 'Ganho de',
// valor1: rendimentoPoupanca,
// nome: 'Poupança',
// texto: 'Total resgatado',
// valor2: totalReceberPoupanca,
// size: 4,
// destaque: false,

export const TypographyTitulo1Styled = styled(Typography)`
  font-size: 14px;
`;

export const TypographyValor1Styled = styled(Typography)`
  font-size: 14px;
  font-weight: bold;

  ${({ destaque }) =>
    destaque &&
    css`
      font-size: 18px;
      color: ${({ theme }) => theme.palette.common.black};
    `}
`;

export const TypographyNomeStyled = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.common.black};
`;

export const TypographyTextoStyled = styled(Typography)`
  font-size: 14px;
`;

export const TypographyValor2Styled = styled(Typography)`
  font-size: 14px;
  font-weight: bold;
  ${({ destaque }) =>
    destaque &&
    css`
      color: ${({ theme }) => theme.palette.primary.main};
    `}
`;

export const GraficoItem = styled(Grid)`
  color: ${({ theme }) => theme.palette.common.black};
  text-align: center;
`;

// const GraficoTexto = styled(Typography)`
//   font-size: 12px;
// `;

// const GraficoTextoDestaque = styled(Typography)`
//   font-weight: bold;
//   font-size: 16px;
//   color: rgba(0, 0, 0, 0.6);
// `;

export const Bar = styled.div`
  width: 100%;
  height: ${props => `${props.size * 8}px`};
  background: ${props =>
    props.destaque
      ? ({ theme }) => theme.palette.primary.light
      : 'rgba(0,0,0,0.2)'};
`;

export const FooterContainer = styled.div``;
