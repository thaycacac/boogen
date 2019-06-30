import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import styled from 'styled-components'

class Button extends Component {
  static type = 'Button'
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
