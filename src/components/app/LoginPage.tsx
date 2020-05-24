import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Form, Field } from 'react-final-form'
import { ValidationErrors, SubmissionErrors } from 'final-form'
import { useSelector } from 'react-redux'
import { useDispatchThunk } from '../hooks/useDispatchThunk'
import { login } from '../../actions/user'
import {
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'

import TextInput from '../mui-form/TextInput'
import { model, redux } from 'interface'

type FormValues = Pick<model.User, 'email' | 'password'>

const LoginPage: React.FC<RouteComponentProps> = () => {
  const user = useSelector((state: {user: redux.User}) => state.user.user)
  const dispatch = useDispatchThunk()

  const validate = (values: FormValues): ValidationErrors => {
    const errors: Partial<FormValues> = {}
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
      email: values.email,
      password: values.password,
    }
    dispatch(login(data))
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

export default LoginPage