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
  to: any,
  bind: String,
}

export class SubcribeStyle extends Component<UISubcribeStyle> {

  private rule = this.props.to.getStyle

  componentDidMount() {
    this.props.to.subcribeStyle(this.forceUpdate())
  }

  componentWillUnmount() {
    this.props.to.unSubscribeStyle(this.forceUpdate())
  }

  render() {
    return this.props.children(this.props.to, this.rule)
  }
}

export default StyleContainer
