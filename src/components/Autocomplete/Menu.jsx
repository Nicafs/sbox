import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Paper } from '@material-ui/core';

const PaperStyled = styled(Paper)`
  position: absolute;
  z-index: 2;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  left: 0;
  right: 0;
`;

function Menu(props) {
  const { innerProps, children } = props;
  return (
    <PaperStyled square {...innerProps}>
      {children}
    </PaperStyled>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
};

export default Menu;
