import React, { useState } from 'react';

import LoaderCircular from 'components/LoaderCircular';
import Grid from 'components/MaterialUI/Grid';

import { TypographyTituloStyled, ToolbarStyled, IndicadorAtivo } from './style';

export default function SubMenuToolbar({
  rightComponent,
  menu,
  menuSelecionadoIdx,
  loading,
}) {
  const [idxSelecionado, setIdxSelecionado] = useState(menuSelecionadoIdx);

  const handlerWrapper = (handlerFn, idx) => {
    setIdxSelecionado(idx);
    handlerFn();
  };

  return (
    <ToolbarStyled>
      <Grid container alignItems="center" justify="space-around">
        {/* <Box pl={4}> */}
        <Grid item>
          <Grid container spacing={3} style={{ margin: 0 }}>
            {menu.map(({ titulo, onClick }, i) => (
              <Grid key={i} item onClick={() => handlerWrapper(onClick, i)}>
                <TypographyTituloStyled
                  color="textSecondary"
                  ativo={i === idxSelecionado}
                >
                  {titulo}
                </TypographyTituloStyled>
                {i === idxSelecionado && <IndicadorAtivo />}
              </Grid>
            ))}
            {loading && (
              <Grid item>
                <LoaderCircular size={20} />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item>
          {rightComponent && (
            <Grid container alignItems="center">
              {rightComponent}
            </Grid>
          )}
        </Grid>
        {/* </Box> */}
      </Grid>
    </ToolbarStyled>
  );
}
