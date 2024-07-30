import styled from 'styled-components';

import { Container as Material, Card } from '@material-ui/core';

export const Container = styled(Material)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  height: 100vh;
`;

export const CardStyled = styled(Card)`
  padding: 10px 40px;
`;

export const AvatarStyled = styled.img`
  width: 100%;
  max-width: 180px;
  max-height: 180px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
