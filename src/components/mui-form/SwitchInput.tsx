import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, FormControlLabel, FormHelperText, Switch, SwitchProps, FormControlLabelProps } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { FieldRenderProps } from 'react-final-form'


const useAdditonalStyles = makeStyles(() => ({
  warn: {
    color: orange[500],
  },
}))

type SwitchPropsEx = SwitchProps & FormControlLabelProps
type RenderProps = FieldRenderProps<boolean, HTMLInputElement | HTMLLabelElement>

const SwitchInput = ({input, meta, ...rest}: RenderProps): JSX.Element => {
  const {
    id,
    label,
    size,
    disabled,
    disableRipple,
    edge,
    color,
    required,
    inputProps,
    labelPlacement,
    classes = {},
    className,
    ref,
  }: Partial<SwitchPropsEx> = rest

  const addtionalClasses = useAdditonalStyles()

  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
  const showWarn = meta.touched && meta.data && meta.data.warning

  return (
    <FormControl error={showError}>
      <FormControlLabel
        control={
          <Switch
            id={id}
            classes={{
              root: clsx(classes.root, className),
            }}
            size={size}
            name={input.name}
            checked={input.checked}
            value={input.value}
            onChange={input.onChange}
            edge={edge}
            color={color}
            required={required}
            disableRipple={disableRipple}
            inputProps={inputProps}
            inputRef={ref}
          />
        }
        labelPlacement={labelPlacement}
        disabled={disabled}
        label={label}
      />
      {showError ?
        <FormHelperText>{meta.error || meta.submitError}</FormHelperText>
      : showWarn ?
        <FormHelperText className={addtionalClasses.warn}>{meta.data?.warning}</FormHelperText>
      : null}
    </FormControl>
  )
}

export default SwitchInput
