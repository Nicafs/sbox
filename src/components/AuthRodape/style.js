import styled from 'styled-components';

import { Link, Button } from '@material-ui/core';

const DivRodapeStyled = styled.div`
  margin-top: 3vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  .pergunta {
    color: ${({ theme }) => theme.palette.primary.unselected};
  }
`;

const LinkRodapeStyled = styled(Link)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.5em;
`;

const ButtonRodapeStyled = styled(Button)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.5em;
`;

export { DivRodapeStyled, LinkRodapeStyled, ButtonRodapeStyled };
