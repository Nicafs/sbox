import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Chip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

function MultiValue(props) {
  const { isFocused, children, removeProps } = props;
  const ChipStyled = styled(Chip)`
    margin: ${({ theme }) => theme.spacing(0.5, 0.25)};
    background-color: ${({ theme }) =>
      isFocused ? theme.palette.grey[300] : theme.palette.grey[700]};
  `;

  return (
    <ChipStyled
      tabIndex={-1}
      label={children}
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon {...removeProps} />}
    />
  );
}

/* eslint-disable react/forbid-prop-types */
MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  }).isRequired,
  selectProps: PropTypes.object.isRequired,
};

MultiValue.defaultProps = {
  children: undefined,
};

export default MultiValue;
