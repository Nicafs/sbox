import Button from 'components/MaterialUI/Button';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

import FilterListIcon from '@material-ui/icons/FilterList';

export const Titulo = styled(Typography)``;
export const FilterListIconStyled = styled(FilterListIcon)`
  margin-left: 5px;
  font-size: 22px;
  cursor: pointer;
`;
export const BotaoFiltrarMobileStyled = styled(Button)`
  font-size: 14px;
`;
export const TypographyContadorStyled = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 16px;
  }
`;
