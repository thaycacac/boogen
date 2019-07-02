import React from 'react'

function EnhanceElement(Element: any) {
  return class extends Element {
    render() {
      console.log('Element in core/EnhanceElement', this.props);
      const {
        elementContainer,
        elementContainer: {
          state: {
            id,
            type,
            data,
            className
          }
        }
      } = this.props
      const instance = super.render()
      // TODO: read more
      elementContainer.state.componentStyle = instance.type.componentStyle
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
