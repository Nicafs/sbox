import React from 'react';

import styled from 'styled-components';

const DividerStyled = styled.div`
  width: 100%;
  border-bottom-style: dashed;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.palette.grey[500]};
`;

export default function CustomDivider() {
  return <DividerStyled>&nbsp;</DividerStyled>;
}
