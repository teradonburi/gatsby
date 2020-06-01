import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, FormLabel, FormHelperText, Slider, FormControlProps, FormLabelProps, SliderProps } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { FieldRenderProps } from 'react-final-form'


const useAdditonalStyles = makeStyles(() => ({
  warn: {
    color: orange[500],
  },
}))

type SliderPropsEx = SliderProps & FormControlProps & FormLabelProps & {label: string}
type RenderProps = FieldRenderProps<number, HTMLInputElement | HTMLLabelElement>

const SwitchInput = ({input, meta, ...rest}: RenderProps): JSX.Element => {
  const {
    label,
    disabled,
    valueLabelDisplay = 'auto',
    marks,
    step,
    min,
    max,
    defaultValue,
    scale,
    valueLabelFormat,
    orientation,
    classes = {},
    className,
  }: Partial<SliderPropsEx> = rest

  const addtionalClasses = useAdditonalStyles()

  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
  const showWarn = meta.touched && meta.data && meta.data.warning

  return (
    <FormControl
      error={showError}
      disabled={disabled}
    >
      <FormLabel component='legend'>{label}</FormLabel>
      <Slider
        classes={classes}
        className={className}
        name={input.name}
        value={input.value}
        onChange={(event: React.ChangeEvent<{}>, number: number | number[]): void =>
          input.onChange({target: {value: number}})
        }
        valueLabelDisplay={valueLabelDisplay}
        marks={marks}
        step={step}
        min={min}
        max={max}
        defaultValue={defaultValue}
        scale={scale}
        valueLabelFormat={valueLabelFormat}
        orientation={orientation}
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
