import React from 'react';

import Grid from 'components/MaterialUI/Grid';
import MenuItem from 'components/MaterialUI/MenuItem';
import Popover from 'components/MaterialUI/Popover';
import Typography from 'components/MaterialUI/Typography';

import { FilterListIconStyled } from '../style';
import { TextoOrdenacaoSelecionada } from './style';

export default function BotaoOrdenacao({
  ordenacaoSelecionada,
  ordenacaoSelecionadaHandler,
  exibirApenasIcone,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ordenacaoSelecionadaHandlerWrapper = ordenacao => {
    handleClose();
    ordenacaoSelecionadaHandler(ordenacao);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {exibirApenasIcone ? (
        <Grid container onClick={handleClick}>
          <Grid item>
            <FilterListIconStyled />
          </Grid>
        </Grid>
      ) : (
        <Grid item container direction="column" onClick={handleClick}>
          <Grid item>
            <Typography variant="h6" color="textSecondary" align="right">
              Ordenar por:
            </Typography>
          </Grid>
          <Grid item container alignItems="center" justify="flex-end">
            <TextoOrdenacaoSelecionada variant="h6" align="right">
              {ordenacaoSelecionada.label}
            </TextoOrdenacaoSelecionada>
            <FilterListIconStyled />
          </Grid>
        </Grid>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Grid container direction="column">
          {[
            {
              label: 'Mais rentáveis',
              value: 'MAIS_RENTAVEIS',
            },
            {
              label: 'Menor valor',
              value: 'MENOR_VALOR',
            },
            {
              label: 'Maior valor',
              value: 'MAIOR_VALOR',
            },
            {
              label: 'Recente',
              value: 'RECENTE',
            },
          ]
            .filter(({ value }) => value !== ordenacaoSelecionada)
            .map(({ label, value }) => (
              <Grid
                key={value}
                item
                onClick={() =>
                  ordenacaoSelecionadaHandlerWrapper({ label, value })
                }
              >
                <MenuItem>{label}</MenuItem>
              </Grid>
            ))}
        </Grid>
      </Popover>
    </div>
  );
}
