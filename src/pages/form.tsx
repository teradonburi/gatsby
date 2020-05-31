import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Form, Field } from 'react-final-form'
import { ValidationErrors } from 'final-form'
// import { FieldArray, useFieldArray } from 'react-final-form-arrays'
import { Button, MenuItem, FormControlLabel, Radio } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import TextInput from '../components/mui-form/TextInput'
import SwitchInput from '../components/mui-form/SwitchInput'
import RadioGroupInput from '../components/mui-form/RadioGroupInput'

type FormValues = {
  single?: string;
  multiple?: string;
  select?: string;
  radio?: string;
}

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: 500,
    padding: 20,
  },
  error: {
    fontWeight: 'bold',
    color: red[500],
  },
}))

const TestForm: React.FC = (props) => {
  const classes = useStyles(props)

  const validate = (values: FormValues): ValidationErrors  => {
    const errors: Partial<FormValues> = {}
    if (!values.single) {
      errors.single = '必須項目です'
    }
    if (!values.multiple) {
      errors.multiple = '必須項目です'
    }
    if (!values.select) {
      errors.select = '必須項目です'
    }
    if (!values.radio) {
      errors.radio = '必須項目です'
    }
    return errors
  }

  const submit = (values: FormValues): void => {
    window.alert(JSON.stringify(values))
  }

  return (
    <Form onSubmit={submit} validate={validate}>
      {({handleSubmit, submitError, form}): JSX.Element => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <Field name='single' label='単一行' variant='outlined' placeholder='お名前' component={TextInput} />
          <Field name='multiple' label='複数行' variant='outlined' placeholder='自由記述' multiline component={TextInput} />
          <Field name='select' label='選択肢' variant='outlined' placeholder='選択項目' select component={TextInput} >
            <MenuItem value='選択肢1'>選択肢１</MenuItem>
            <MenuItem value='選択肢2'>選択肢２</MenuItem>
            <MenuItem value='選択肢3'>選択肢３</MenuItem>
          </Field>
          <Field name='switch' label='スイッチ' type='checkbox' component={SwitchInput} />
          <Field name='radio' label='ラジオ' type='radio' row component={RadioGroupInput} >
            <FormControlLabel value='female' control={<Radio />} label="女性" />
            <FormControlLabel value='male' control={<Radio />} label="男性" />
            <FormControlLabel value='other' control={<Radio />} label="その他" />
          </Field>
          <Button type='submit' variant='contained' color='primary'>送信</Button>
          {submitError && <div className={classes.error}>{submitError}</div>}
        </form>
      )}
    </Form>
  )
}

export default TestForm