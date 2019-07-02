import { Component } from 'react'
import { Container } from 'unstated'

class StyleContainer extends Container<any> {
  setStyle() {

  }

  getStyle() {

  }
}

interface UISubcribeStyle {
  children: any,
  to: any
}

export class SubcribeStyle extends Component<UISubcribeStyle> {
  componentDidUpdate(){
    this.props.to.state._listenersStyle.push('ok')
  }
  render() {
    return this.props.children('a', 'b')
  }
}

export default StyleContainer
