import styled from 'styled-components';

import { Divider } from '@material-ui/core';

const FormStyled = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`;

const DivisoriaStyled = styled(Divider)`
  margin-top: 15%;
`;

const Titulo = styled.h1`
  font-size: 28px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;
  text-align: center;
`;

export { FormStyled, DivisoriaStyled, Titulo };
