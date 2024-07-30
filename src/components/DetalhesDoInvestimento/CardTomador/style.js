import Card from 'components/MaterialUI/Card';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const CardStyled = styled(Card)`
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.grey[200]}
    padding: 10px;
    width: 280px;
    height: 340px;
`;

export const GridContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 10px;
  padding: 5px;
`;

export const TomadorImagem = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

export const EmpresaImagem = styled.img`
  width: 110px;
  height: 28px;
  border-radius: 4px;
`;

export const CidadeTypographyStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.black};
  text-transform: capitalize;
`;

export const TypographyBlackStyled = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.common.black};
`;
