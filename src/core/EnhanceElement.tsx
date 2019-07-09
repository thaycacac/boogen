import React from 'react'

function EnhanceElement(Element: any) {
  return class extends Element {
    render() {
      console.log('Element in core/EnhanceElement', this.props);
      let {
        elementContainer,
        elementContainer: {
          state: {
            id,
            type,
            className
          }
        }
      } = this.props
      const instance = super.render()
      const { children } = instance.props
      const props = {
        ...this.props,
        ...{ children },
        ...{
          'data-element': id,
          'data-type': type,
          // text can't drag
          'draggable': Element.type !== 'Text',
          'id': 'boogen-' + id,
          className,
          ref: (e: any) => elementContainer.state.domElement = e,
          instanceElement: instance,
          onChange: elementContainer.setState
        },
        key: id
      }
      return React.cloneElement(instance, props)
    }
  }
}

export default EnhanceElement
