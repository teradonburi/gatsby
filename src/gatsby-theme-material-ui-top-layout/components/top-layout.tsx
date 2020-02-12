import React from 'react'
import { Provider } from 'react-redux'
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout'
import { Theme } from '@material-ui/core'

import createStore from '../../state/createStore'

export default function TopLayout({ children, theme }: {children: JSX.Element | JSX.Element[]; theme: Theme}): JSX.Element {
  const store = createStore()

  return (
    <Provider store={store}>
      <ThemeTopLayout theme={theme}>{children}</ThemeTopLayout>
    </Provider>
  )
}