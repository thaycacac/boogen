import React, { Component } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import EnhanceElement from '../../../core/EnhanceElement'
import { InputController } from '../../controller'
import { ElementContainer } from '../../../container';

class Text extends Component<any> {
  static type: string = 'Text'

  static Inspector(container: ElementContainer) {
    return (
      <Subscribe to={[container]}>
          {
            (elementContainer) => {
              const { data: { value } } = elementContainer.state
              return <>
                {/* <InputController
                  placeholder="Hello world"
                  type="text"
                  value={value}
                  title="Content"
                  onChange={(e: any) => {
                    elementContainer.setState({
                      data: {
                        value: e
                      }
                    })
                  }}
                /> */}
              </>
            }
          }
        </Subscribe>
    )
  }

  onChangeText = (event: any) => {
    const value = event.target.innerHTML
    this.props.elementContainer.setState({
      data: {
        value: value
      }
    })
  }

  render() {
    return (
      <Span
        contentEditable={true}
        suppressContentEditableWarning
        onInputCapture={(e) => this.onChangeText(e)}
      >
        { this.props.elementContainer.state.data.value }
      </Span>
    )
  }
}

const Span = styled.span`
  &:focus {
    outline: none;
  }
`

export default EnhanceElement(Text)
