import React from 'react';

import PropTypes from 'prop-types';

import SliderUI from '@material-ui/core/Slider';

const Slider = ({
  defaultValue,
  min,
  max,
  step,
  marks,
  valueLabelDisplay,
  onChange,
  value,
  disabled,
}) => (
  <SliderUI
    defaultValue={defaultValue}
    min={min}
    max={max}
    // getAriaValueText="areaTest"
    aria-labelledby="discrete-slider-always"
    step={step}
    marks={marks}
    valueLabelDisplay={valueLabelDisplay || null}
    onChange={onChange}
    value={value}
    disabled={disabled}
  />
);

/* eslint-disable react/forbid-prop-types */
Slider.propTypes = {
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  marks: PropTypes.array,
  valueLabelDisplay: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  defaultValue: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  marks: [],
  valueLabelDisplay: 'auto',
  value: null,
  onChange: null,
};

export default Slider;
