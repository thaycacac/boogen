import React, { Component, useState } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import { Subscribe } from 'unstated'
import {
  MultipleInputController,
  SelectController,
  PreviewClassController,
} from '../../../element/controller'
import { ElementContainer } from '../../../container'
import UIAlert from '../../../UI/components/alert'

const type = [
  { name: 'Primary', value: 'primary' },
  { name: 'Secondary', value: 'secondary' },
  { name: 'Success', value: 'success' },
  { name: 'Info', value: 'info' },
  { name: 'Warning', value: 'warning' },
  { name: 'Danger', value: 'danger' },
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
]

interface StateAlert {
  typeAlert: string
}

class Button extends Component<any, StateAlert> {
  constructor(props: any) {
    super(props)
    this.state = {
      typeAlert: 'primary',
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
                label="Type Alert"
                listData={type}
                container={container}
                handleChange={(value: any) => {
                  const { instance } = container.state
                  instance.setState({
                    typeAlert: value,
                  })
                }}
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
    return <UIAlert color={this.state.typeAlert}>{this.props.children}</UIAlert>
  }
}

export default EnhanceElement(Button)
