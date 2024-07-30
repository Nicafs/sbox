import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const TextoStyled = styled(Typography)`
  position: absolute;
  left: 2px;
  bottom: 6px;
  font-size: 16px;
`;

function Placeholder(props) {
  const { innerProps = {}, children } = props;
  return (
    <TextoStyled color="textSecondary" {...innerProps}>
      {children}
    </TextoStyled>
  );
}

/* eslint-disable react/forbid-prop-types */
Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
};

Placeholder.defaultProps = {
  children: undefined,
  innerProps: undefined,
};

export default Placeholder;
