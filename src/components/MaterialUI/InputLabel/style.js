import styled from 'styled-components';

const InputLabel = styled.label`
  color: black;
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '16px')};
  letter-spacing: 0.8px;
`;

export { InputLabel };
