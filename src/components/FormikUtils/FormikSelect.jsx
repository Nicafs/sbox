import React from 'react';

import { getIn } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Checkbox from '../MaterialUI/Checkbox';
import FormControl from '../MaterialUI/FormControl';
import FormHelperText from '../MaterialUI/FormHelperText';
import InputLabel from '../MaterialUI/InputLabel';
import MenuItem from '../MaterialUI/MenuItem';
import Select from '../MaterialUI/Select';
import { formikDefaultProps } from './FormikHandlers';

const DefaultOption = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

function gerarRenderItemMulti(list, placeholder = 'Selecione...') {
  const listObj = list
    .map(it => ({ [it.value]: it.label }))
    .reduce((a, b) => ({ ...a, ...b }), {});
  return selected =>
    selected.length > 0 ? (
      selected.map(it => listObj[it]).join(', ')
    ) : (
      <DefaultOption>{placeholder}</DefaultOption>
    );
}

export default function FormikSelect({
  formik,
  name,
  customHandleChange,
  cleanErrorOnChange,
  list,
  renderItem,
  label,
  fullWidth,
  multi,
  placeholder,
  ...otherProps
}) {
  const { errors, touched } = formik;

  const possuiErro = getIn(errors, name) && getIn(touched, name);

  const id = `select-${name}`;

  const { onBlur, onChange, value, name: nameFormik } = formikDefaultProps({
    formik,
    name,
    customHandleChange,
    cleanErrorOnChange,
  });

  const hasValue = list ? list.find(l => l.value === value) : false;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={possuiErro}
      id={`formControl-${name}`}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        displayEmpty={!!placeholder}
        multiple={multi}
        {...otherProps}
        name={nameFormik}
        onBlur={onBlur}
        onChange={onChange}
        value={hasValue ? value : ''}
        renderValue={
          multi ? gerarRenderItemMulti(list, placeholder) : undefined
        }
      >
        {!!placeholder && (
          <MenuItem value="" aria-label="Selecione" disabled>
            <DefaultOption>{placeholder}</DefaultOption>
          </MenuItem>
        )}
        {list.map((e, idx) => (
          <MenuItem
            key={e.value}
            value={e.value}
            name={`${name}-option-${idx}`}
          >
            {multi && (
              <Checkbox checked={formik.values[name].includes(e.value)} />
            )}
            {renderItem ? renderItem(e) : e.label}
          </MenuItem>
        ))}
      </Select>
      {possuiErro && (
        <FormHelperText id={`helper${id}`}>
          {getIn(errors, name)}
        </FormHelperText>
      )}
    </FormControl>
  );
}

/* eslint-disable react/forbid-prop-types */
FormikSelect.propTypes = {
  cleanErrorOnChange: PropTypes.bool,
  customHandleChange: PropTypes.func,
  formik: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  list: PropTypes.array.isRequired,
  multi: PropTypes.bool,
  name: PropTypes.string.isRequired,
  renderItem: PropTypes.func,
};

FormikSelect.defaultProps = {
  cleanErrorOnChange: false,
  fullWidth: false,
  label: '',
  multi: false,
  customHandleChange: undefined,
  renderItem: undefined,
};
