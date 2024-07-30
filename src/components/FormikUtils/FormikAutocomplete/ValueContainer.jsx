import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const DivStyled = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 1;
  align-items: center;
  overflow: hidden;
`;

function ValueContainer(props) {
  const { children } = props;
  return <DivStyled>{children}</DivStyled>;
}

/* eslint-disable react/forbid-prop-types */
ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
};

ValueContainer.defaultProps = {
  children: undefined,
};

export default ValueContainer;
