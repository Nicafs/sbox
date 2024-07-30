import Button from 'components/MaterialUI/Button';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

const TypographyStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const ButtonVoltarStyled = styled(Button)`
  border-color: ${({ theme }) => theme.palette.primary.main};
`;

export { TypographyStyled, ButtonVoltarStyled };
