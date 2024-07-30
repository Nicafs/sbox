import devices from 'commons/constants/devices';
import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

const Titulo = styled.h1.attrs(props => props)`
  font-weight: normal;
  font-size: 30px;
  letter-spacing: 0.8px;
  margin: 0;
  text-align: center;

  @media ${devices.mobile} {
    font-size: 20px;
  }
`;

const TextoAguarde = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.palette.primary.main};
  text-align: center;
  margin: 0;

  @media ${devices.mobile} {
    font-size: 18px;
  }
`;

const TextoSolicitacao = styled.p`
  font-size: 18px;
  text-align: center;
  margin: 0;

  @media ${devices.mobile} {
    font-size: 16px;
  }
`;

const TextoRodape = styled.p`
  font-size: 12px;
  text-align: center;
  margin: 0;

  @media ${devices.mobile} {
    font-size: 10px;
  }
`;

const ButtonStyled = styled(Button)`
  font-size: 14px;

  @media ${devices.mobile} {
    font-size: 12px;
  }
`;

const ContainerStyled = styled(Grid)`
  overflow-y: hidden;
`;

const ContainerTextos = styled(Grid)`
  @media ${devices.mobile} {
    margin: 0;
  }
`;

export {
  Titulo,
  TextoAguarde,
  TextoSolicitacao,
  TextoRodape,
  ButtonStyled,
  ContainerStyled,
  ContainerTextos,
};
