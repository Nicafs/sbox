import styled from 'styled-components';

export const HeaderDesktopStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: break-spaces;
`;

export const HeaderTextDescStyled = styled.p`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 2em;
  font-weight: lighter;
`;

export const HeaderTextDesktopStyled = styled.p`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 4em;
  font-weight: bold;
`;
