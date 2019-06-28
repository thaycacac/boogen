import React, { Component } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'

interface IText {
  value: string,
  elementContainer: any
}

class Text extends Component<IText> {
  refText: any

  static defaultProps = {
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
    console.log('props text ', this.props);
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

export default Text
