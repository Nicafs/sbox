import styled from 'styled-components';

import { Grid } from '@material-ui/core';

export const HeaderGridStyled = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
`;
