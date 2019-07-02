import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import styled from 'styled-components'
import { SketchPicker, CirclePicker } from 'react-color'
import { Subscribe } from 'unstated'

class Section extends Component {
  static type = 'Section'

  static Inspector(container: any) {
    return (
      <Subscribe to={[container]}>
        {
          () => {
            return <>
              <input type="text" value={container.getStyle['background-color']} onChange={
                (event : any) =>{
                  container.setStyleString(event.target.value)
                }
              } />
              <SketchPicker />
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
