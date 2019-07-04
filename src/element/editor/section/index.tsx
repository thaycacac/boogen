import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'
import { Subscribe } from 'unstated'

class Section extends Component {
  static type = 'Section'

  static Inspector(container: any) {
    return (
      <Subscribe to={[container]}>
        {
          () => {
            return <>
              <textarea onChange={
                (event : any) =>{
                  container.customStyle(event.target.value)
                }
              } />
              <SketchPicker onChangeComplete={ (color) => {
                container.setStyle({
                  background : color.hex
                })
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
