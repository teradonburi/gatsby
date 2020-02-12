import { createMuiTheme, colors } from '@material-ui/core'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme