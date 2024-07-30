import styled from 'styled-components';

export const Titulo = styled.p`
  border-bottom-style: dashed;
  border-bottom-width: 1px;
  border-bottom-color: grey;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.common.black};
  padding-bottom: 10px;
`;
