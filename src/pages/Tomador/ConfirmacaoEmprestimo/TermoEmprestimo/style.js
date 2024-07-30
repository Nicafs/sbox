import styled from 'styled-components';

export const DivPrincipalStyle = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.primary};
  max-height: 400px;
  overflow-y: scroll;

  body {
    background-color: transparent !important;
    padding: 16px !important;
  }
`;
