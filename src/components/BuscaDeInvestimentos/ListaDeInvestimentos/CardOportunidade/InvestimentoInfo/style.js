import Grid from 'components/MaterialUI/Grid';
// import green from '@material-ui/core/colors/green';
import { VisibilityIcon } from 'components/MaterialUI/Icon';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

export const InfoGridStyled = styled(Grid)`
  margin-top: 10px;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 8px;
`;
export const VerifiedUserIconStyled = styled(VerifiedUserIcon)`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.primary.light};
`;
export const TypographyValorStyled = styled(Typography)`
  font-weight: bold;
`;
export const VisibilityIconStyled = styled(VisibilityIcon)`
  margin-right: 6px;
  color: ${({ theme }) => theme.palette.grey[600]};
`;
