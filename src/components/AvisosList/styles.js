import Checkbox from 'components/MaterialUI/Checkbox';
import Typography from 'components/MaterialUI/Typography';
import styled, { css } from 'styled-components';

export const AvisoLista = styled.ul`
  padding: 0;
  min-width: 200px;
  list-style-type: ${({ comCheckbox }) => (comCheckbox ? 'none' : 'unset')};
`;

export const AvisoItem = styled.p`
  font-size: 20px;
  color: black;

  ${({ destaque }) =>
    destaque &&
    css`
      font-weight: bold;
      color: ${({ theme }) => theme.palette.primary.selected};
    `}

  ${({ theme }) => theme.breakpoints.down('md')} {
    text-align: justify;
    font-size: 14px;
  }
`;

export const AvisoTitulo = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[700]};
  text-align: center;
`;

export const CheckboxStyled = styled(Checkbox)`
  padding: 0px 8px 0px 0px;
`;
