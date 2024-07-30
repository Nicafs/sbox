import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const TextoStyled = styled(Typography)`
  font-size: 16px;
`;

function SingleValue(props) {
  const { children, innerProps } = props;
  return <TextoStyled {...innerProps}>{children}</TextoStyled>;
}

/* eslint-disable react/forbid-prop-types */
SingleValue.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props passed to the wrapping element for the group.
   */
  selectProps: PropTypes.object.isRequired,
};

SingleValue.defaultProps = {
  children: undefined,
};

export default SingleValue;
