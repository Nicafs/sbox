import styled from 'styled-components';

const SublinhadoStyled = styled.div`
  justify-self: center;
  border-radius: 25px;
  height: 4px;
  width: 20px;
  background-color: ${({ theme }) => theme.palette.primary.selected};
`;

export { SublinhadoStyled };
