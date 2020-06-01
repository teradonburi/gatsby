import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FormControlLabel, Checkbox, FormHelperText, FormControlLabelProps, CheckboxProps } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { FieldRenderProps } from 'react-final-form'

const useAdditonalStyles = makeStyles(() => ({
  warn: {
    color: orange[500],
  },
}))

type CheckboxGroupPropsEx = FormControlLabelProps & CheckboxProps
type RenderProps = FieldRenderProps<boolean, HTMLInputElement | HTMLLabelElement>

const CheckboxInput = ({input, meta, ...rest}: RenderProps): JSX.Element => {

 const {
    disabled,
    label,
    labelPlacement,
    classes = {},
    className,
  }: Partial<CheckboxGroupPropsEx> = rest

  const addtionalClasses = useAdditonalStyles()

  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
  const showWarn = meta.touched && meta.data && meta.data.warning

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            name={input.name}
            value={input.value}
            onChange={input.onChange}
            disabled={disabled}
            classes={classes}
            className={className}
          />
        }
        labelPlacement={labelPlacement}
        label={label}
      />
      {showError ?
        <FormHelperText>{meta.error || meta.submitError}</FormHelperText>
      : showWarn ?
        <FormHelperText className={addtionalClasses.warn}>{meta.data?.warning}</FormHelperText>
      : null}
    </div>
  )
}

export default CheckboxInput
