import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import { Subscribe } from 'unstated'
import styled from 'styled-components'
import { InputController, MultipleInputController } from '../../../element/controller'

/**
 * @param Text - Text inner button
 * @param Shape - Rectangle or rounded
 * @param Type - Type danger, success,...
 * @param Outline - Outline or not
 * @param Size - Small or medium or large
 * @param Block - Blog or not
 * @param Active - Active or diactive
 * @param Link - OPtion for link
*/
class Button extends Component<any> {
  static type = 'Button'
  static Inspector(container: any) {
    return (
      <Subscribe to={[container]}>
        {
          () => {
            return <>
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
          }
        }
      </Subscribe>
    )
  }
  render() {
    return <UIButton>
      { this.props.children }
    </UIButton>
  }
}

const UIButton = styled.button<any>`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
`

export default EnhanceElement(Button)

