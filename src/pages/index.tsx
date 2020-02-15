import React from 'react'
import { Link } from 'gatsby'
import { connect, ConnectedProps } from 'react-redux'

import { Form, Field } from 'react-final-form'
import { ValidationErrors, SubmissionErrors } from 'final-form'

import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Email } from '@material-ui/icons'
import { orange } from '@material-ui/core/colors'

import Layout from '../components/layout'
import SEO from '../components/seo'
import TextInput from '../components/mui-form/TextInput'

import { load, create } from '../actions/user'
import { redux } from 'interface'

const connector = connect(
  // propsに受け取るreducerのstate
  ({user}: {user: redux.User}) => ({
    users: user?.users,
  }),
  // propsに付与するactions
  { load, create }
)

const useStyles = makeStyles(theme => ({
  root: {
    fontStyle: 'italic',
    fontSize: 21,
    minHeight: 64,
    // 画面サイズがモバイルサイズのときのスタイル
    [theme.breakpoints.down('xs')]: {
      fontStyle: 'normal',
    },
  },
  card: {
    background: (props: {bgcolor: string}): string => `${props.bgcolor}`, // props経由でstyleを渡す
  },
  img: {
    width: 150,
    height: 150,
  },
  name: {
    margin: 10,
    color: theme.palette.primary.main,
  },
  gender: {
    margin: 10,
    color: theme.palette.secondary.main, // themeカラーを参照
  },
}))

interface FormValues {
  gender?: string;
  first?: string;
  last?: string;
  email?: string;
}

type Props = ConnectedProps<typeof connector>

const IndexPage: React.FC<Props> = (props) => {
  const { users, load, create } = props
  const [open, setOpen] = React.useState(false)
  const classes = useStyles({bgcolor: 'ff00ff'})

  React.useEffect(() => {
    load()
  }, [])

  const validate = (values: FormValues): ValidationErrors => {
    const errors: FormValues = {}
    if (!values.first) {
      errors.first = '必須項目です'
    }
    if (!values.last) {
      errors.last = '必須項目です'
    }
    if (!values.email) {
      errors.email = '必須項目です'
    }
    return errors
  }

  const submit = (values: FormValues): (SubmissionErrors | Promise<SubmissionErrors | undefined> | void) => {
    const data = {
      gender: values.gender,
      name: {
        first: values.first,
        last: values.last,
      },
      email: values.email,
    }
    create(data)
      .then(() => load())
      .finally(() => setOpen(false))
  }

  return (
    <Layout>
      <SEO title='Home' />
      {/* 配列形式で返却されるためmapで展開する */}
      {users &&
        users.map(user => {
          return (
            // ループで展開する要素には一意なkeyをつける（ReactJSの決まり事）
            <Card key={user.email} style={{ marginTop: '10px' }}>
              <CardContent className={classes.card}>
                <img className={classes.img} src={user.picture?.thumbnail} />
                <p className={classes.name}>
                  {'名前:' + user?.name?.last + ' ' + user?.name?.first}
                </p>
                <p className={classes.gender}>
                  {'性別:' + (user?.gender == 'male' ? '男性' : '女性')}
                </p>
                <div style={{ textAlign: 'right' }}>
                  <Email style={{ marginRight: 5, color: orange[200] }} />
                  {user?.email}
                </div>
              </CardContent>
            </Card>
          )
        })}
        <Button
          variant="contained"
          color="primary"
          onClick={(): void => setOpen(true)}
          style={{marginTop: 30}}
        >
          新規ユーザ作成
        </Button>
        <Link style={{display: 'block', marginTop: 30}} to="/hoge">存在しないページ</Link>
        <Dialog
          open={!!open}
          onClose={(): void => setOpen(false)}
        >
          <DialogTitle>新規ユーザ</DialogTitle>
          <DialogContent>
            <Form onSubmit={submit} validate={validate}>
              {({handleSubmit}): JSX.Element =>
                <form onSubmit={handleSubmit}>
                  <Field name='gender' initialValue='male' component={TextInput} label='性別' select >
                    <MenuItem value='male'>男性</MenuItem>
                    <MenuItem value='female'>女性</MenuItem>
                  </Field>
                  <Field name='last' component={TextInput} label='姓' />
                  <Field name='first' component={TextInput} label='名' />
                  <Field name='email' component={TextInput} label='Email' type='email' />
                  <Button type='submit' variant='contained' color='primary'>送信</Button>
                </form>
              }
            </Form>
          </DialogContent>
        </Dialog>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}


export default connector(IndexPage)
