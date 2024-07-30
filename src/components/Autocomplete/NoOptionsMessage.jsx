import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const TextoStyled = styled(Typography)`
  padding: ${({ theme }) =>
    theme.spacing(1, 2)}; //TODO ver se isso ta funcionando como deveria
`;

function NoOptionsMessage(props) {
  const { innerProps, children } = props;
  return (
    <TextoStyled color="textSecondary" {...innerProps}>
      {children}
    </TextoStyled>
  );
}

/* eslint-disable react/forbid-prop-types */
NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

NoOptionsMessage.defaultProps = {
  children: undefined,
};

export default NoOptionsMessage;
