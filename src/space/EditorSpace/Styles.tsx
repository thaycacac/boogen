import React,{ Component } from 'react'
import StyleContext from './StyleContext'

class Styles extends Component<any> {
  refStyle: any
  state = {
    sheets: null
  }

  render() {
    return <>
      <style ref={e => this.refStyle = e}></style>
      {
        this.refStyle ?
        <StyleContext.Provider value={this.refStyle.sheet}>
          { this.props.children }
        </StyleContext.Provider> :
        null
      }
    </>
  }
}

export default Styles
