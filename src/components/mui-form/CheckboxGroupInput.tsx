import React from 'react'
import { FormControl, FormLabel, FormGroup, FormControlProps, FormLabelProps, FormGroupProps } from '@material-ui/core'

type CheckboxGroupPropsEx = FormGroupProps & FormControlProps & FormLabelProps & {label: string; error: Error}

const RadioGroupInput = (props: Partial<CheckboxGroupPropsEx>): JSX.Element => {

 const {
    row,
    disabled,
    required,
    label,
    error,
    classes = {},
    className,
    children,
  } = props

  return (
    <FormControl
      component='fieldset'
      error={error}
      disabled={disabled}
      required={required}
    >
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup
        row={row}
        classes={classes}
        className={className}
      >
        {children}
      </FormGroup>
    </FormControl>
  )
}

export default RadioGroupInput
