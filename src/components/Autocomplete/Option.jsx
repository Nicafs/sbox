import React from 'react';

import PropTypes from 'prop-types';

import { MenuItem } from '@material-ui/core';

function Option(props) {
  const { innerRef, isFocused, isSelected, innerProps, children } = props;
  return (
    <MenuItem
      ref={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 501 : 401,
        whiteSpace: 'unset',
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  // innerProps: PropTypes.shape({
  //   id: PropTypes.string.isRequired,
  //   key: PropTypes.string.isRequired,
  //   onClick: PropTypes.func.isRequired,
  //   onMouseMove: PropTypes.func.isRequired,
  //   onMouseOver: PropTypes.func.isRequired,
  //   tabIndex: PropTypes.number.isRequired,
  // }).isRequired,
  /**
   * Inner ref to DOM Node
   */
  // innerRef: PropTypes.oneOfType([
  //   PropTypes.oneOf([null]),
  //   PropTypes.func,
  //   PropTypes.shape({
  //     current: PropTypes.any.isRequired
  //   })
  // ]),
  /**
   * Whether the option is focused.
   */
  isFocused: PropTypes.bool.isRequired,
  /**
   * Whether the option is selected.
   */
  isSelected: PropTypes.bool.isRequired,
};

Option.defaultProps = {
  children: undefined,
};

export default Option;
