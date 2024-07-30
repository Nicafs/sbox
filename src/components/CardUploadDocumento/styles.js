import styled, { css } from 'styled-components';

import Paper from '../MaterialUI/Paper';

export const PaperStyled = styled(Paper)`
  ${({ uploadconcluido, theme }) =>
    uploadconcluido &&
    css`
      border-top: 8px solid ${theme.palette.primary.main};
    `}
`;

export const Container = styled.div`
  padding: 30px;
`;

export const DocumentoImagem = styled.img`
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
`;
