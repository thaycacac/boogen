import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'
import { Subscribe } from 'unstated'
import { InputController } from '../../controller'
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
              <textarea
                onChange={
                  (event: any) => {
                    container.customStyle(event.target.value)
                  }
                }
              />
              <SketchPicker onChangeComplete={ (color) => {
                container.setStyle('background', color.hex)
              }}/>
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
  min-height: 50px;
  background : gray;
  display: block;
`

export default EnhanceElement(Section)
