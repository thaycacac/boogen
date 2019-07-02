import React, { Component } from 'react'
import EnhanceElement from '../../../core/EnhanceElement'
import { Subscribe } from 'unstated'
import styled from 'styled-components'

class Button extends Component<any> {
  static type = 'Button'
  static Inspector(container: any) {
    return (
      <Subscribe to={[container]}>
        {
          () => {
            const { value } = container.state
            return <input
              type='text'
              value={value}
              onChange={
                (value: any) => container.setState({value})
              }
            />
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
`

export default EnhanceElement(Button)
