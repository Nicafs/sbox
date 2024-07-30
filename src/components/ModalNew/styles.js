import styled from 'styled-components';

import { DialogActions, DialogTitle } from '@material-ui/core';

export const ImgStyled = styled.img`
  width: 128px;
`;

export const DialogTitleStyled = styled(DialogTitle)`
  padding-right: 48px;
  padding-left: 48px;
  min-height: 48px;
  justify-content: center;
  text-align: center;
`;

export const DialogActionsStyled = styled(DialogActions)`
  justify-content: center;
`;
