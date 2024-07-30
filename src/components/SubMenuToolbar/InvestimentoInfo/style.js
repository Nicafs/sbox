import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';
// import green from '@material-ui/core/colors/green';

export const GridInvestimentosInfo = styled(Grid)`
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 30px;
  cursor: pointer;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    background: transparent;
  }
`;

export const TypographyLegendaStyled = styled(Typography)`
  font-size: 12px;
`;

export const TypographyValorStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.black};
  font-size: 14px;
`;

export const TypographyRentabilidadeStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 14px;
  font-weight: bold;
`;

export const GridItemStyled = styled(Grid)`
  margin-right: 20px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-right: 0px;
  }
`;

export const BotaoConcluirStyled = styled(Button)`
  height: auto;
  font-weight: bold;
  min-width: 160px;
`;
