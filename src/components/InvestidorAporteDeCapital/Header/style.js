import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const TituloTypographyStyled = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: space-between;
    text-align: center;
  }
`;
