import React from 'react';

import Radio from 'components/MaterialUI/Radio';
import styled from 'styled-components';

import { FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const RadioLabel = styled(FormControlLabel)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const RadioStyled = withStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
    '&$checked': {
      color: theme.palette.primary.dark,
    },
  },
  checked: {},
}))(props => <Radio color="default" {...props} />);
