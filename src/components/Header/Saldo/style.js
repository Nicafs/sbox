import styled from 'styled-components';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import Grid from '../../MaterialUI/Grid';

const SaldoSpanStyled = styled.span`
  color: black;
  font-weight: lighter;
  font-size: 1em;
  @media (min-device-width: 450px) and (max-device-width: 1200px) {
    font-size: 2em;
  }
`;
const ValorSaldoSpanStyled = styled.span`
  font-weight: bold;
  font-size: 1.5em;
  @media (min-device-width: 450px) and (max-device-width: 1200px) {
    font-size: 3em;
  }
`;
const GridSaldoStyled = styled(Grid)`
  height: 100%;
  color: white;
  .gridSaldo {
    display: flex;
    justify-content: ${({ flex }) => `flex-${flex}`};
  }
`;
const InfoOutlinedIconStyled = styled(InfoOutlinedIcon)`
  @media (min-device-width: 450px) and (max-device-width: 1200px) {
    width: 30px;
    height: 30px;
  }
`;

export {
  SaldoSpanStyled,
  ValorSaldoSpanStyled,
  GridSaldoStyled,
  InfoOutlinedIconStyled,
};
