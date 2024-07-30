import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const TextoStyled = styled(Typography)`
  font-size: 16px;
`;

function SingleValue(props) {
  const { innerProps, children } = props;
  return <TextoStyled {...innerProps}>{children}</TextoStyled>;
}

SingleValue.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
};

SingleValue.defaultProps = {
  children: undefined,
};
export default SingleValue;
