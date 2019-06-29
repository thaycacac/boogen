import React from 'react'

function EnhanceElement(Element: any) {
  return class extends Element {
    render() {
      console.log('Element in core/EnhanceElement', this.props);
      const { elementContainer } = this.props
      const instance = super.render()
      const {
        id,
        type,
        children,
        parentId
      } = elementContainer.state
      const props = {
        'data-element': id,
        'data-type': type,
        ref: (e: any) => elementContainer.state.domElement = e
      }
      return React.cloneElement(instance, { ...props, ...this.props , ...instance.props })
    }
  }
}

export default EnhanceElement
