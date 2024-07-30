import React, { useState } from 'react';

import LoaderCircular from 'components/LoaderCircular';
import Divider from 'components/MaterialUI/Divider';
import { PowerSettingsNewIcon } from 'components/MaterialUI/Icon';

import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import { Container } from './styles';

export default function DrawerConteudo({
  itens,
  menuSelecionadoIdx,
  logoutFn,
  loadingMenu,
}) {
  const [itemSelecionadoIdx, setItemIdxSelecionado] = useState(
    menuSelecionadoIdx,
  );

  const itensPadroes = [
    {
      titulo: 'Sair',
      onClick: logoutFn,
      iconeComponente: <PowerSettingsNewIcon />,
    },
  ];

  const onClickHandler = (onClickFn, idx) => {
    setItemIdxSelecionado(idx);
    if (onClickFn) {
      onClickFn();
    }
  };

  const currentVersion = window.localStorage.getItem('appVersion');

  return (
    <>
      <List component="nav">
        {(itens || [])
          .concat(itensPadroes)
          .map(({ titulo, onClick, iconeComponente, inserirDivisao }, i) => (
            <div key={titulo}>
              <ListItem
                button
                selected={i === itemSelecionadoIdx}
                onClick={() => onClickHandler(onClick, i)}
              >
                {iconeComponente && (
                  <ListItemIcon>{iconeComponente}</ListItemIcon>
                )}
                <ListItemText primary={titulo} />
              </ListItem>
              {inserirDivisao && <Divider />}
            </div>
          ))}
        {loadingMenu && (
          <ListItem>
            <LoaderCircular size={20} />
          </ListItem>
        )}
      </List>
      <Typography
        color="textSecondary"
        variant="subtitle1"
        style={{ position: 'fixed', bottom: '20px', left: '35vw' }}
      >
        v{currentVersion}
      </Typography>
    </>
  );
}
