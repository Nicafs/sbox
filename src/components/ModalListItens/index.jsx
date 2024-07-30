import React from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  zebradoList: {
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}!important`,
      color: `${theme.palette.common.white}!important`,
    },
    '&:nth-child(even):hover': {
      backgroundColor: `${theme.palette.primary.main}!important`,
      color: `${theme.palette.common.white}!important`,
    },
  },
}));

export default function ModalListItens({
  open,
  handleClose,
  title,
  itens,
  filter,
  label,
  helperText,
}) {
  const classes = useStyles();

  // const [selectedIndex, setSelectedIndex] = React.useState();
  // const [selectedItem, setSelectedItem] = React.useState();
  const [filterValue, setFilterValue] = React.useState('');

  // const handleListItemClick = (index, item) => {
  //   setSelectedIndex(index);
  //   setSelectedItem(item);
  // };

  const handleChange = e => {
    const { value } = e.target;
    setFilterValue(value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(null)}
      aria-labelledby={`Dialog ${title}`}
    >
      <DialogTitle id="dialog-title">
        {title}
        <TextField
          style={{ marginTop: '10px' }}
          autoFocus
          variant="outlined"
          id="filtro_modal"
          name="filtro_modal"
          label={label}
          value={filterValue}
          onChange={handleChange}
          type="text"
          helperText={helperText}
          fullWidth
        />
      </DialogTitle>

      <DialogContent>
        <List component="nav" aria-label="Itens da Lista">
          {itens &&
            itens
              .filter(item => filter(item, filterValue))
              .map(item => {
                return (
                  <ListItem
                    className={classes.zebradoList}
                    key={item.value}
                    button
                    // selected={selectedIndex === i}
                    // onClick={() => handleListItemClick(i, item)}
                    onClick={() => handleClose(item)}
                  >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText
                      style={{ wordBreak: 'break-word' }}
                      primary={`${item.text || item.label}`}
                    />
                  </ListItem>
                );
              })}
        </List>
      </DialogContent>
      {/* <DialogActions> */}
      {/*  <Button */}
      {/*    onClick={() => handleClose(null)} */}
      {/*    color="secondary" */}
      {/*    secondary="true" */}
      {/*    variant="contained" */}
      {/*  > */}
      {/*    fechar */}
      {/*  </Button> */}
      {/*  <Button */}
      {/*    onClick={() => handleClose(selectedItem)} */}
      {/*    color="primary" */}
      {/*    primary="true" */}
      {/*    variant="contained" */}
      {/*  > */}
      {/*    Confirmar */}
      {/*  </Button> */}
      {/* </DialogActions> */}
    </Dialog>
  );
}

/* eslint-disable react/forbid-prop-types */
ModalListItens.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  itens: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
};
