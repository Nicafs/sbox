import styled from 'styled-components';

import { Link, Typography } from '@material-ui/core';

import devices from '../../commons/constants/devices';
import Button from '../MaterialUI/Button';
import Grid from '../MaterialUI/Grid';

const FooterContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 20px;

  @media ${devices.mobile} {
    flex-direction: column;
  }
`;

const FooterInfo = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.dark};
  min-height: 150px;
  padding: 20px 120px;

  p {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 12px;
    line-height: 22px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 20px;
    padding-bottom: 120px;
  }
`;

const Logo = styled.img`
  width: 48px;
`;

const TermosDeUsoGrid = styled(Grid)`
  justify-content: flex-end;

  @media ${devices.mobile} {
    justify-content: flex-start;
    flex-direction: column;
  }
`;

const AcoesGrid = styled(Grid)`
  justify-content: flex-start;

  @media ${devices.mobile} {
    justify-content: flex-start;
    flex-direction: column;
  }
`;

const ButtonStyled = styled(Button)`
  padding: 5px 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  text-transform: none;
`;

const FooterTypographyStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const FooterLinkStyled = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-weight: bold;
  cursor: pointer;
`;

export {
  FooterContainer,
  FooterInfo,
  Logo,
  ButtonStyled,
  TermosDeUsoGrid,
  AcoesGrid,
  FooterTypographyStyled,
  FooterLinkStyled,
};
