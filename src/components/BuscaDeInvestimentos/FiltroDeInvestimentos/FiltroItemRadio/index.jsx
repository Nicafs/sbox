import React from 'react';

import FormControl from 'components/MaterialUI/FormControl';
import Grid from 'components/MaterialUI/Grid';
import RadioGroup from 'components/MaterialUI/RadioGroup';

import FiltroItemTitulo from '../FiltroItemTitulo';
import { RadioLabel, RadioStyled } from './style';

export default function FiltroItemRadio({ titulo, onChange, options, valor }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FiltroItemTitulo titulo={titulo} />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="filtro"
            name="filtro"
            value={JSON.stringify(valor)}
            onChange={evt => {
              onChange(JSON.parse(evt.target.value));
            }}
          >
            {options.map(({ tituloV, valor: opcaoValor }) => (
              <RadioLabel
                key={tituloV}
                value={JSON.stringify(opcaoValor)}
                control={<RadioStyled />}
                label={tituloV}
                labelPlacement="end"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
