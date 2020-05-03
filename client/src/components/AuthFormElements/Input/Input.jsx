import React from 'react';

const Input = ({input, label, theme, meta, ...props}) => {
  return (
    <label className="input">
      <h4 className="input__label visually-hidden">{label}</h4>
      <input className={(theme === "light" || theme === "gray") && `input__area input__area_theme-${theme}`} autoComplete="off" {...input} {...props} />
      {meta.touched && meta.error && <span className="input__error">{meta.error}</span>}
    </label>
  )
}

export default Input;
