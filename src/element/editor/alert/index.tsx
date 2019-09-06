import React, { Component, useState } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import { Subscribe } from 'unstated'
import {
  InputController,
  MultipleInputController,
  SelectController,
  PreviewClassController,
} from '../../../element/controller'
import { ElementContainer } from '../../../container'
import UIAlert from '../../../UI/components/alert'

const type = [
  { name: 'Link', value: 'link' },
  { name: 'Primary', value: 'primary' },
  { name: 'Secondary', value: 'secondary' },
  { name: 'Success', value: 'success' },
  { name: 'Info', value: 'info' },
  { name: 'Warning', value: 'warning' },
  { name: 'Danger', value: 'danger' },
]
const size = [{ name: 'Large', value: 'lg' }, { name: 'Small', value: 'sm' }]

interface StateButton {
  typeButton: string
  isOutline: boolean
  sizeButton: string
  isBlock: boolean
  isActive: boolean
  isDisable: boolean
}

class Button extends Component<any, StateButton> {
  constructor(props: any) {
    super(props)
    this.state = {
      typeButton: 'primary',
      isOutline: false,
      sizeButton: '',
      isBlock: false,
      isActive: true,
      isDisable: false,
    }
  }

  static type = 'Button'
  static Inspector(container: ElementContainer) {
    return (
      <Subscribe to={[container]}>
        {() => {
          return (
            <>
              <PreviewClassController container={container} />
              <SelectController
                label="Type Button"
                listData={type}
                container={container}
                handleChange={(value: any) => {
                  const { instance } = container.state
                  instance.setState({
                    typeButton: value,
                  })
                }}
              />
              <SelectController
                label="Size Button"
                listData={size}
                container={container}
                handleChange={(value: any) => {
                  const { instance } = container.state
                  instance.setState({
                    sizeButton: value,
                  })
                }}
              />
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
    return (
      <UIAlert>
        {this.props.children}
      </UIAlert>
    )
  }
}

export default EnhanceElement(Button)
