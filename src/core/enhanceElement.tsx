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
        data
      } = elementContainer.state
      const props = {
        ...{
          'data-element': id,
          'data-type': type,
          // text can't drag
          'draggable': Element.type !== 'Text',
          ref: (e: any) => elementContainer.state.domElement = e,
          instanceElement: instance,
          onChange: elementContainer.setState
        },
        ...this.props,
        ...instance.props
      }
      return React.cloneElement(instance, props)
    }
  }
}

export default EnhanceElement
