import React, { Component } from 'react'
import EnhanceElement from '../../core/EnhanceElement'
import styled from 'styled-components'
import { Section } from '..';

class Button extends Component {
  static type = 'Section'
  static PropsDefault = {
  }
  render() {
    return (
      <UIButton>
        hello
      </UIButton>
    )
  }
}

const UIButton = styled.button`
`

export default EnhanceElement(Button)
