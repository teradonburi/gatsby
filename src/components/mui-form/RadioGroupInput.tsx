import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, FormHelperText, RadioGroup, RadioGroupProps, FormControlProps } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { FieldRenderProps } from 'react-final-form'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3 / 2),
  },
}))

const useAdditonalStyles = makeStyles(() => ({
  warn: {
    color: orange[500],
  },
}))


type RadioGroupPropsEx = RadioGroupProps & FormControlProps
type RenderProps = FieldRenderProps<boolean, HTMLInputElement | HTMLLabelElement>

const RadioGroupInput = ({input, meta, ...rest}: RenderProps): JSX.Element => {

 const {
    row,
    disabled,
    classes = {},
    className,
    children,
  }: Partial<RadioGroupPropsEx> = rest

  const baseClasses = useStyles()
  const addtionalClasses = useAdditonalStyles()

  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
  const showWarn = meta.touched && meta.data && meta.data.warning

  return (
    <FormControl
      component='fieldset'
      error={showError}
      disabled={disabled}
      classes={{
        ...baseClasses,
        root: clsx(baseClasses.root, classes.root, className),
      }}
    >
      <RadioGroup
        row={row}
        name={input.name}
        value={input.value}
        onChange={input.onChange}>
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
