import styled from 'styled-components';

export const Ul = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin: 20px;
  padding: 0;
  list-style-type: none;
`;

export const Li = styled.li`
  margin: 0px 2px;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  cursor: pointer;
  border: none;
  @media only screen and (max-width: 600px) {
    min-width: 23px;
    width: 23px;
  }
`;
