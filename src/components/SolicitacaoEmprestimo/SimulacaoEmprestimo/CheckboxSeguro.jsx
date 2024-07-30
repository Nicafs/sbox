import React from 'react';

import { Link } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { useAppGlobal } from '~/providers/AppGlobal';

import { FormControlLabelStyled } from './style';

const CheckboxSeguro = ({ onChange, value, btnVerCondicoesClickHandler }) => {
  const { tipoFluxo } = useAppGlobal();
  const ehFluxoEp = tipoFluxo === 'BANCO_SEMEAR';

  return (
    <FormControlLabelStyled
      control={
        <Checkbox
          name="checkboxComSeguro"
          checked={value}
          onChange={() => onChange(!value)}
          style={{ paddingTop: 0 }}
        />
      }
      label={
        <>
          <Typography variant="subtitle1" style={{ fontWeight: '600' }}>
            Contratar com seguro
          </Typography>
          <Typography variant="subtitle2">
            {ehFluxoEp
              ? `Valor do seguro já incluso nas parcelas do empréstimo.`
              : `O seguro cobre até 3 parcelas no caso de desemprego.`}
          </Typography>
          <Link
            href="#"
            onClick={btnVerCondicoesClickHandler}
            variant="subtitle1"
            style={{ display: 'block' }}
          >
            Confira as regras e benefícios completos.
          </Link>
        </>
      }
    />
  );
};

export default CheckboxSeguro;
