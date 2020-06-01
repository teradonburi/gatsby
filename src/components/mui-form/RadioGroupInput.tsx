import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, FormLabel, FormHelperText, RadioGroup, FormControlProps, FormLabelProps, RadioGroupProps } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { FieldRenderProps } from 'react-final-form'

const useAdditonalStyles = makeStyles(() => ({
  warn: {
    color: orange[500],
  },
}))


type RadioGroupPropsEx = RadioGroupProps & FormControlProps & FormLabelProps & {label: string}
type RenderProps = FieldRenderProps<boolean, HTMLInputElement | HTMLLabelElement>

const RadioGroupInput = ({input, meta, ...rest}: RenderProps): JSX.Element => {

 const {
    row,
    disabled,
    required,
    label,
    classes = {},
    className,
    children,
  }: Partial<RadioGroupPropsEx> = rest

  const addtionalClasses = useAdditonalStyles()

  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
  const showWarn = meta.touched && meta.data && meta.data.warning

  return (
    <FormControl
      component='fieldset'
      error={showError}
      disabled={disabled}
      required={required}
    >
      <FormLabel component='legend'>{label}</FormLabel>
      <RadioGroup
        row={row}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        classes={classes}
        className={className}
      >
        {children}
      </RadioGroup>
      {showError ?
        <FormHelperText>{meta.error || meta.submitError}</FormHelperText>
      : showWarn ?
        <FormHelperText className={addtionalClasses.warn}>{meta.data?.warning}</FormHelperText>
      : null}
    </FormControl>
  )
}

export default RadioGroupInput
