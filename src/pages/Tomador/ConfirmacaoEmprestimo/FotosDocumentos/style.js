import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled, { css } from 'styled-components';

const BotaoAcao = styled(Button)`
  background: white;
  padding: 10px 30px;
  border-radius: 40px;
  margin: 10px;
  font-size: 18px;

  ${({ selecionado }) =>
    selecionado &&
    css`
      border: 1px solid ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: bold;
    `}
`;

const UploadCardsContainer = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('md')} {
    margin: 0;
  }
`;

const AvisosContainer = styled(Grid)`
  padding: 0px 20px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    margin-top: 50px;
  }
`;

const TypographyTituloStyled = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 24px;
  }
`;

const TypographySubtituloStyled = styled(Typography)`
  color: black;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 16px;
  }
`;
export {
  AvisosContainer,
  UploadCardsContainer,
  BotaoAcao,
  TypographySubtituloStyled,
  TypographyTituloStyled,
};
