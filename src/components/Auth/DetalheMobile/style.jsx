import styled from 'styled-components';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const HeaderMobileStyled = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  height: ${({ theme }) => theme.spacing(8)}px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  white-space: break-spaces;
`;

export const HeaderTextStyled = styled.p`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const ArrowBackIconStyled = styled(ArrowBackIcon)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 28px;
  position: absolute;
  left: 0;
`;
