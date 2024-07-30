import styled from 'styled-components';

import Button from '../../MaterialUI/Button';

export const ButtonArrow = styled(Button)`
  width: 48px;
  height: 48px;
`;

export const Titulo = styled.h1`
  font-size: 26px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;
  text-align: center;
`;

export const SubTitulo = styled.h3`
  font-size: 24px;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: normal;
  text-align: center;
`;

export const CountdownContainer = styled.div`
  p {
    font-size: 24px;
    margin: 0 0 10px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      font-size: 16px;
      text-align: center;
      color: ${({ theme }) => theme.palette.primary.contrastText};
    }
  }

  span {
    font-weight: bold;
    font-size: 64px;
    display: block;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      font-size: 32px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    text-align: center;
  }
`;

export const OfertaExpirada = styled.p`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.error.main};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 24px;
    text-align: center;
  }
`;
