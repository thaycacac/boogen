import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import styled from 'styled-components'

class Section extends Component {
  static type = 'Section'

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
