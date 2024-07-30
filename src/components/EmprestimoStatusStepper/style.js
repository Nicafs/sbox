import devices from 'commons/constants/devices';
import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

const StatusStyled = styled.p`
  padding-left: 24px;

  @media ${devices.mobile} {
    padding-left: 0px;
  }
`;

const StepperStyled = styled(Stepper)`
  @media ${devices.mobile} {
    padding-left: 0px;
  }
`;

const ExplicacaoContainer = styled(Grid)`
  min-height: 100px;
  border-radius: 7px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.palette.primary.main};
  padding: 20px;

  img {
    width: 96px;
  }

  h1 {
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    margin: 0;
  }
`;

const StatusTexto = styled(Typography)`
  font-weight: bold;
  text-align: center;
`;

export { StatusStyled, ExplicacaoContainer, StepperStyled, StatusTexto };
