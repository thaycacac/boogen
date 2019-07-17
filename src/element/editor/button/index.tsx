import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import { Subscribe } from 'unstated'
import { InputController, MultipleInputController } from '../../../element/controller'
import { ElementContainer } from '../../../container'
import UIButton from '../../../UI/components/button'

class Button extends Component<any> {
  static type = 'Button'
  static Inspector(container: ElementContainer) {
    return (
      <Subscribe to={[container]}>
        {() => {
          return (
            <>
              <InputController
                label="Background"
                keyCSS="background-color"
                typeChange="style"
                container={container}
              />
              <MultipleInputController
                label="Padding"
                keyCSS="padding"
                typeChange="style"
                container={container}
              />
              <MultipleInputController
                label="Margin"
                keyCSS="margin"
                typeChange="style"
                container={container}
              />
            </>
          )
        }}
      </Subscribe>
    )
  }
  render() {
    return <UIButton>{this.props.children}</UIButton>
  }
}

export default EnhanceElement(Button)
