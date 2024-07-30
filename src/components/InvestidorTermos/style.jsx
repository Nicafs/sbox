import React from 'react';

import styled from 'styled-components';

import AppBar from '../MaterialUI/AppBar';
import Button from '../MaterialUI/Button';
import Tab from '../MaterialUI/Tab';
import Tabs from '../MaterialUI/Tabs';

export const AppBarStyled = styled(AppBar)`
  color: ${({ theme }) => theme.palette.text.primary};
  background-color: ${({ theme }) => theme.palette.common.white};
`;

export const TabsStyled = styled(props => {
  return <Tabs {...props} classes={{ indicator: 'indicator' }} />;
})`
  && .indicator {
    height: 0px;
  }
`;

export const TabStyled = styled(props => {
  return <Tab {...props} />;
})`
  font-weight: 550;
  height: ${({ theme }) => theme.spacing(10)}px;
  color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.contrastText : theme.palette.text.primary};
  background-color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.main : theme.palette.common.white};
  text-transform: None;
`;

export const DivTermosAceiteStyled = styled.div`
  color: ${({ theme }) => theme.palette.text.primary};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 10px 15px;
  }
`;

export const ButtonAvancarStyled = styled(Button)`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.grey[300] : theme.palette.primary.main}};
`;
