import React, { Component } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import EnhanceElement from '../../../core/EnhanceElement'

interface IText {
  value: string,
  elementContainer: any
}

class Text extends Component<IText> {
  refText: any

  static PropsDefault = {
    value: 'Text Example'
  }

  static type: string = 'Text'

  static Inspector(container: any) {
    return {
      general:
        <Subscribe to={[container]}>
          {
            () => {
              const { value } = container.state
              return <input type='text' value={value} />
            }
          }
        </Subscribe>
    }
  }

  componentDidMount() {
    console.log('refText', this.refText);
  }

  onChangeText = (event: any) => {
    const value = event.target.value
    console.log('event target of text', value);
    this.props.elementContainer.setState({ value })
  }

  render() {
    console.log('props text in Element-space/text/index.tsx', this.props);
    return (
      <Span
        contentEditable
        onInput={(e) => this.onChangeText(e)}
      >
        { this.props.value }
      </Span>
    )
  }
}

const Span = styled.span`
  color: red
`

export default EnhanceElement(Text)
