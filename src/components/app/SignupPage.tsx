import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Form, Field } from 'react-final-form'
import { ValidationErrors, SubmissionErrors } from 'final-form'
import { useSelector } from 'react-redux'
import { useDispatchThunk } from '../hooks/useDispatchThunk'
import { create } from '../../actions/user'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  MenuItem,
} from '@material-ui/core'

import TextInput from '../mui-form/TextInput'
import { model, redux } from 'interface'

type FormValues = Pick<model.User, 'gender' | 'name' | 'email' | 'password'>

const SignupPage: React.FC<RouteComponentProps> = () => {
  const user = useSelector((state: {user: redux.User}) => state.user.user)
  const dispatch = useDispatchThunk()

  const validate = (values: FormValues): ValidationErrors => {
    const errors: Partial<FormValues> = {}
    if (!values.gender) {
      errors.gender = '必須項目です'
    }
    if (!values.name) {
      errors.name = '必須項目です'
    }
    if (!values.email) {
      errors.email = '必須項目です'
    }
    if (!values.password) {
      errors.password = '必須項目です'
    }
    return errors
  }

  const submit = (values: FormValues): (SubmissionErrors | Promise<SubmissionErrors | undefined> | void) => {
    const data = {
      gender: values.gender,
      name: values.name,
      email: values.email,
      password: values.password,
    }
    dispatch(create(data))
  }

  if (user) {
    navigate('/app/user')
  }

  return (
    <Form onSubmit={submit} validate={validate}>
      {({handleSubmit}): JSX.Element =>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Field name='gender' initialValue='male' component={TextInput} label='性別' select >
                <MenuItem value='male'>男性</MenuItem>
                <MenuItem value='female'>女性</MenuItem>
                <MenuItem value='other'>その他</MenuItem>
              </Field>
              <Field name='name' component={TextInput} label='名前' />
              <Field name='email' type='email' component={TextInput} label='メールアドレス' />
              <Field name='password' type='password' component={TextInput} label='パスワード' />
            </CardContent>
            <CardActions><Button type='submit' variant='contained' color='primary'>送信</Button></CardActions>
          </Card>
        </form>
      }
    </Form>
  )
}

export default SignupPage