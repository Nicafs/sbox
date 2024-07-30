import { getIn } from 'formik';

export function formikDefaultProps({
  formik,
  name,
  customHandleChange,
  cleanErrorOnChange = false,
  customValueMask,
}) {
  const { setFieldValue, setFieldTouched, values } = formik;

  function handleChange(value) {
    if (customHandleChange) {
      setFieldValue(name, customHandleChange(value));
    } else {
      setFieldValue(name, value);
    }
    if (cleanErrorOnChange) {
      formik.setFieldError(name, undefined);
    }
  }

  function getValue() {
    return customValueMask
      ? customValueMask(getIn(values, name))
      : getIn(values, name);
  }

  const value = getValue();
  return {
    onBlur: () => setFieldTouched(name, true, true),
    onChange: e => handleChange(e.target.value),
    value,
    name,
  };
}
