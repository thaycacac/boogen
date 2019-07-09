import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import styled from 'styled-components'
import { TwitterPicker } from 'react-color'
import { Subscribe } from 'unstated'
import { InputController, MultipleInputController } from '../../controller'
class Section extends Component {
  static type = 'Section'

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
              <TwitterPicker onChangeComplete={ (color) => {
                container.setStyle('background-color', color.hex)
              }}/>
              <InputController
                label="Width"
                keyCSS="width"
                typeChange="style"
                container={container}
              />
              <InputController
                label="Height"
                keyCSS="height"
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
              <textarea
                onChange={
                  (event: any) => {
                    container.customStyle(event.target.value)
                  }
                }
              />
            </>
          }
        }
      </Subscribe>
    )
  }

  render() {
    return (
      <UISection>
        { this.props.children }
      </UISection>
    )
  }
}

const UISection = styled.div`
  padding : 40px;
  min-height: 80px;
  background : #d6d6d6;
  display: block;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.25)
`

export default EnhanceElement(Section)
