import React, { Component } from 'react'
import StyleContext from './StyleContext'

class Styles extends Component<any> {
  refStyle: any
  state = {
    sheets: null,
  }

  componentDidMount() {
    // @ts-ignore
    const instance = document.styleSheets
    const sheets = Array.from(instance).find((sheet: any) => sheet.ownerNode === this.refStyle)
    this.setState({
      sheets: sheets,
    })
  }

  render() {
    return (
      <>
        <style ref={e => (this.refStyle = e)} />
        {this.refStyle ? (
          <StyleContext.Provider value={this.refStyle.sheet}>
            {this.props.children}
          </StyleContext.Provider>
        ) : null}
      </>
    )
  }
}

export default Styles
