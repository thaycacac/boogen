import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './variable'

export class ThemeProviderContext extends Component<any> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>{this.props.children}</>
      </ThemeProvider>
    )
  }
}

export default ThemeProviderContext
