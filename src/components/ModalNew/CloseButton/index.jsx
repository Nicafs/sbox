import React from 'react';

import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import TooltipStyled from './styles';

const CloseButton = ({ onClose }) => {
  return (
    <TooltipStyled title="Fechar" placement="top-end">
      <IconButton edge="start" color="inherit" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </TooltipStyled>
  );
};

export default CloseButton;
