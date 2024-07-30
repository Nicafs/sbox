import styled from 'styled-components';

import Button from '../../MaterialUI/Button';

export const Titulo = styled.h1`
  color: ${({ theme }) => theme.palette.common.black};
  font-size: min(5vw, 22px);
  font-weight: normal;
  margin: auto;
  width: max-content;
`;

export const ButtonStyled = styled(Button)`
  margin: 10px;
  width: calc(50% - 20px);
  ${({ ativo, theme }) =>
    ativo === 'true' &&
    `color: ${theme.palette.primary.main};
     border-color: ${theme.palette.primary.main};`}
`;

export const TextoLimite = styled.div`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 0.8px;
  margin-top: 4px;
  text-align: center;
`;
