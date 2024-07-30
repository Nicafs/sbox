import Card from 'components/MaterialUI/Card';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const Imagem = styled.img`
  width: 80px;
  align-self: flex-start;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 128px;
  }
`;

export const Container = styled.div`
  padding: 40px;
  min-height: 240px;
`;

export const GridContainer = styled(Grid)`
  padding: 30px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 20px 10px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const TituloStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.dark};

  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 20px;
  }
`;

export const DescricaoStyled = styled(Typography)`
  text-align: justify;
  font-size: 16px;
`;

export const CardStyled = styled(Card)`
  height: 100%;
`;
