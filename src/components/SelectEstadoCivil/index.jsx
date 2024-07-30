import React, { useState, useEffect } from 'react';

import MenuItem from 'components/MaterialUI/MenuItem';
import PropTypes from 'prop-types';

import endpoints from '../../commons/constants/api-constants';
import api from '../../commons/resources/api/general-api';
import Select from '../MaterialUI/Select';

export default function SelectEstadoCivil(props) {
  const [estadoCivil, setEstadoCivil] = useState('');
  const [estadoCivilList, setEstadoCivilList] = useState([]); // {label, value}

  async function buscarEstadoCivil() {
    const response = await api.request(endpoints.GET_ESTADO_CIVIL);
    setEstadoCivilList(response);
  }

  useEffect(() => {
    buscarEstadoCivil();
  }, []);

  function handleChange(e) {
    const valor = e.target.value;
    setEstadoCivil(valor);
    props.onChange(valor);
  }

  const { defaultValue } = defaultValue;

  return (
    <Select
      cy-element="selectEstadoCivil"
      disableUnderline
      value={estadoCivil}
      onChange={handleChange}
      fullWidth
      defaultValue={defaultValue}
      {...props}
    >
      {estadoCivilList &&
        estadoCivilList.map(e => (
          <MenuItem
            cy-element="optionEstadoCivil"
            key={e.value}
            value={e.value}
          >
            {e.label}
          </MenuItem>
        ))}
    </Select>
  );
}

SelectEstadoCivil.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

SelectEstadoCivil.defaultProps = {
  defaultValue: undefined,
};
