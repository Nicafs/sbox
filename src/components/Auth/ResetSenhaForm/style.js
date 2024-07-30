import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

import { Divider } from '@material-ui/core';

const FormStyled = styled.form`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`;

const DivisoriaStyled = styled(Divider)`
  margin-top: 15%;
`;

const GridBotoesStyled = styled(Grid)`
  padding-top: 15px;
`;

const ButtonLoginStyled = styled(Button)`
  border-radius: 25px;
  height: 50px;
  width: 100px;
  color: ${({ theme }) => theme.palette.primary.background};
`;

export { FormStyled, DivisoriaStyled, GridBotoesStyled, ButtonLoginStyled };
