/* eslint-disable no-unused-vars */
import React from 'react';

import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import { Button as ButtonUI } from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';

const ButtonAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const ButtonDefault = styled(ButtonUI)`
  font-size: 16px;
  height: 50px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const ButtonStyled = styled(
  ({
    rounded,
    circle,
    primary,
    secondary,
    light,
    outlinePrimary,
    outlineSecondary,
    ...otherProps
  }) => <ButtonDefault {...otherProps} />,
).attrs(props => ({
  ...props,
  disabled: props.disabled || !!props.loading,
}))`
  ${props =>
    props.rounded &&
    css`
      border-radius: 25px;
      padding: 5px 20px;
    `}

  ${props =>
    props.circle &&
    css`
      border-radius: 50%;
      padding: 5px 20px;
      font-weight: bold;
      min-width: unset;
    `}

${props =>
    props.primary &&
    !props.disabled &&
    css`
      background: ${({ theme }) => theme.palette.primary.main};
      color: white;

      &:hover {
        background: ${({ theme }) => theme.palette.primary.dark};
        font-weight: bold;
      }
    `}

${props =>
    props.secondary &&
    !props.disabled &&
    css`
      background: ${({ theme }) => theme.palette.secondary.main};
      color: white;

      &:hover {
        background: ${({ theme }) => theme.palette.secondary.dark};
        font-weight: bold;
      }
    `}

${props =>
    props.disabled &&
    css`
      background: ${({ theme }) => theme.palette.action.disabledBackground};
      color: ${({ theme }) => theme.palette.action.disabled};
    `}
  

${props =>
    props.light &&
    css`
      background: white;
      color: ${({ theme }) => theme.palette.primary.selected};

      &:hover {
        background: ${({ theme }) => theme.palette.primary.selected};
        color: white;
      }
    `}

  ${props =>
    props.outlinePrimary &&
    css`
      border: 1px solid ${({ theme }) => theme.palette.primary.main};

      &:hover {
        font-weight: bold;
      }
    `}

  ${props =>
    props.outlineSecondary &&
    css`
      border: 1px solid ${({ theme }) => theme.palette.secondary.main};
      color: ${({ theme }) => theme.palette.secondary.main};

      &:hover {
        font-weight: bold;
      }
    `}
`;

const LoopIconContainer = styled.i`
  display: flex;
  justify-content: center;
  animation: ${ButtonAnimation} 2s linear infinite;
`;

const Button = ({ loading = false, children, ...otherProps }) => {
  return (
    <ButtonStyled {...otherProps}>
      {loading ? (
        <LoopIconContainer>
          <LoopIcon />
        </LoopIconContainer>
      ) : (
        children
      )}
    </ButtonStyled>
  );
};

/* eslint-disable react/forbid-prop-types */
Button.propTypes = {
  primary: PropTypes.any,
  secondary: PropTypes.any,
  rounded: PropTypes.any,
  outlinePrimary: PropTypes.any,
  outlineSecondary: PropTypes.any,
  light: PropTypes.any,
  circle: PropTypes.any,
  loading: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  primary: null,
  secondary: null,
  rounded: null,
  light: null,
  circle: null,
  loading: null,
  outlinePrimary: undefined,
  outlineSecondary: undefined,
};

export default Button;
