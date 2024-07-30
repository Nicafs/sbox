import styled from 'styled-components';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import Button from '../../../MaterialUI/Button';
import Divider from '../../../MaterialUI/Divider';

export const Titulo = styled.h2.attrs(props => props)`
  font-weight: normal;
  font-size: 26px;
  letter-spacing: 0.8px;
  margin: 0;
  text-align: left;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    text-align: center;
    font-size: 20px;
  }
`;

export const Descricao = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey.A700};
  margin: 0;
  line-height: 30px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    line-height: 25px;
    text-align: center;
  }
`;

export const ButtonStyled = styled(Button)`
  font-size: 18px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 15px;
  }
`;

export const GridStyled = styled(Grid)`
  width: 100%;
`;

export const DividerStyled = styled(Divider)`
  margin: 10px;
`;

export const FormControlLabelStyled = styled(FormControlLabel)`
  align-items: end;
  margin: 10px 0;
  
  ${({ theme }) => theme.breakpoints.down('sm')} {
  margin: 0;
`;
