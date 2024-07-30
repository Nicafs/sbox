import React from 'react';

import { Modal } from 'components/ModalNew/Modal';

import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from '@material-ui/core';

import { text } from './text';

const Help = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} fullWidth maxWidth="sm" title="Ajuda">
      <span key="Text">{text.title}</span>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {text.expressions.map(({ description, title, Icon }) => (
          <ListItem key={title}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={description} />
          </ListItem>
        ))}
      </List>
      <Button
        key="Actions"
        type="submit"
        onClick={onClose}
        color="primary"
        variant="contained"
      >
        Confirmar
      </Button>
    </Modal>
  );
};

export default Help;
