import React, { Component } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import EnhanceElement from '../../../core/EnhanceElement'
import { InputController } from '../../controller'
import { ElementContainer, EditorSpaceContainer } from '../../../container'
import { TwitterPicker } from 'react-color'

class Text extends Component<any> {
  static type: string = 'Text'

  static Inspector(container: ElementContainer) {
    return (
      <Subscribe to={[container]}>
          {
            () => {
              return <>
                <InputController
                  label="Content"
                  typeChange="data"
                  container={container}
                />
                <InputController
                  label="Color"
                  keyCSS="color"
                  typeChange="style"
                  container={container}
                />
                <TwitterPicker onChangeComplete={ (color) => {
                container.setStyle('color', color.hex)
              }}/>
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
    EditorSpaceContainer.setState({
      selectedId: this.props.elementContainer.state.id
    }, null)
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
