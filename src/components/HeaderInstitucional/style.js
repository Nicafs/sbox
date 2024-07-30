import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

const HeaderContainer = styled(Grid)`
  padding: 0 10px;
  // background: ${({ theme }) => theme.palette.primary.main};
  min-height: 80px;
  color: white;
  background: transparent;
  z-index: 1;
`;

const Logo = styled.img`
  width: 128px;
`;

const ButtonLinkStyled = styled(Button)`
  color: white;
  text-transform: capitalize;
  font-size: 16px;
`;

const ButtonMinhaContaStyled = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 30px;
  background: white;
  padding: 10px 30px;
  margin-left: 20px;
  text-transform: capitalize;
  font-size: 16px;

  &:hover {
    color: white;
    font-weight: bold;
  }
`;

export { HeaderContainer, Logo, ButtonLinkStyled, ButtonMinhaContaStyled };
