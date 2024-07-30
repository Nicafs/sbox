import styled from 'styled-components';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Box from '~/components/MaterialUI/Box';
import Button from '~/components/MaterialUI/Button';
import Grid from '~/components/MaterialUI/Grid';
import Typography from '~/components/MaterialUI/Typography';

export const KeyboardBackspaceIconStyled = styled(KeyboardBackspaceIcon)`
  width: 30px;
  height: 28px;
  color: #a5a7a6;
`;

export const KeyboardBackspaceIconMobileStyled = styled(KeyboardBackspaceIcon)`
  width: 30px;
  height: 25px;
  color: #a5a7a6;
`;

export const VoltarStyled = styled(Typography)`
  font-size: 20px;
  color: #a5a7a6;
`;

export const ValorTotalStyled = styled(Typography)`
  opacity: 0.46;
  font-size: 15px;
  color: #2b2b2b;
`;

export const ValorStyled = styled(Typography)`
  font-size: 28px;
  font-weight: 500;
  color: #313331;
`;

export const ParcelasStyled = styled(Typography)`
  font-size: 16px;
  font-weight: 300;
  color: #313331;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 11px;
  }
`;

export const SolicitarEmprestimoStyled = styled(Typography)`
  // width: 132px;
  width: 100%;
  height: 21px;
  //font-family: FlexoSoft;
  font-size: 14px;
  line-height: 1.71;
  color: #7f8fa4;
`;

export const TituloStyled = styled(Typography)`
  font-size: 24px;
  font-weight: 300;
  color: #000000;
  width: 100%;
`;

export const HeaderGridStyled = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  max-height: fit-content;
`;

export const DivContentStyled = styled.div`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-top: ${({ theme }) => theme.spacing(1.5)}px;
    padding-bottom: ${({ theme }) => theme.spacing(1.5)}px;
    padding-right: ${({ theme }) => theme.spacing(3)}px;
    padding-left: ${({ theme }) => theme.spacing(3)}px;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-top: ${({ theme }) => theme.spacing(5)}px;
    padding-bottom: ${({ theme }) => theme.spacing(5)}px;
    padding-right: ${({ theme }) => theme.spacing(10)}px;
    padding-left: ${({ theme }) => theme.spacing(10)}px;
  }
  width: 100%;
  height: 100%;
`;

export const BoxContentStyled = styled(Box)`
  box-shadow: 0 2px 10px 0 rgba(155, 159, 156, 0.1);
  padding: ${({ theme }) => theme.spacing(7)}px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export const GridButtonStyled = styled(Grid)`
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-right: ${({ theme }) => theme.spacing(8)}px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-right: ${({ theme }) => theme.spacing(3)}px;
  }
`;

export const ButtonNavigationStyled = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  &:disabled {
    background-color: ${({ theme }) => theme.palette.grey.A700};
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const TextoInfoCopiaContratoStyled = styled(Typography)`
  // color: ${({ theme }) => theme.palette.primary.main};
`;
