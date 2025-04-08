import React, { useState } from 'react';
import {
  TextField, InputAdornment, IconButton, MenuItem,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default (props) => {
  const {
    name, label, error = null, onchange, type, required,
  } = props;
  return (
    <TextField
      variant="outlined"
      className="w-full"
      label={label}
      name={name}
      onChange={onchange}
      type={type}
      required={required}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export const PasswordTextField = (props) => {
  const {
    name, label, error = null, onchange, required,
  } = props;
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <TextField
      variant="outlined"
      className="w-full"
      label={label}
      name={name}
      onChange={onchange}
      type={values.showPassword ? 'text' : 'password'}
      {...(error && { error: true, helperText: error })}
      required={required}
      InputProps={{
        endAdornment:
  <InputAdornment position="end">
    <IconButton
      aria-label="toggle password visibility"
      onClick={handleClickShowPassword}
      edge="end"
    >
      {values.showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  </InputAdornment>,
      }}
    />
  );
};

export const TextArea = (props) => {
  const {
    name, label, error, onchange, type, required,
  } = props;
  return (
    <TextField
      name={name}
      label={label}
      className="w-full"
      multiline
      maxRows={2}
      minRows={2}
      onChange={onchange}
      type={type}
      required={required}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export const SelectField = (props) => {
  const [value, setValue] = useState('');
  let index = -1;
  const {
    options = [''], label, error = null, name, extraFunction, getIndex,
  } = props;
  const handleChange = (event) => {
    setValue(event.target.value);
    if (extraFunction) {
      extraFunction(event.target.value);
    }
    if (getIndex) {
      getIndex(index);
    }
  };
  return (
    <TextField
      name={name}
      variant="outlined"
      className="w-full max-h-20"
      value={value}
      select
      SelectProps={{
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          PaperProps: { sx: { maxHeight: 200 } },
        },
      }}
      label={label}
      {...(error && { error: true, helperText: error })}
      onChange={handleChange}
    >
      {options.length > 1 && options.map((item, i) => (
        <MenuItem
          // eslint-disable-next-line react/no-array-index-key
          key={item}
          value={item}
          className="w-full m-auto"
          onClick={(event) => { index = i; }}
        >
          {item}
        </MenuItem>
      ))}
      {options.length < 1
      && (
      <MenuItem
        value=""
      >
        {label}
      </MenuItem>
      )}
    </TextField>
  );
};
