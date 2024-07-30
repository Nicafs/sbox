import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const GridContainer = styled(Grid)`
  border-radius: 30px;
  padding: 8px 12px;
  border-color: ${({ theme }) => theme.palette.primary.dark};
  border-style: solid;
  border-width: 1px;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.down('md')} {
    border: none;
  }
`;

export const Icone = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 4px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 32px;
    height: 32px;
  }
`;

export const TypographyContadorStyled = styled(Typography)`
  font-weight: bold;

  ${({ theme }) => theme.breakpoints.down('md')} {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;
