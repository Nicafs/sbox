import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export const TypographyCorpo = styled(Typography)`
  variant: body1;
  margin-bottom: 10px;
`;

export const TypographyTopico = styled(Typography)`
  variant: h6;
  margin-bottom: 10px;
  font-weight: bold;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    variant: h5;
  }
`;
