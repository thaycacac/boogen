import React, { Component } from 'react'
import styled from 'styled-components'

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
    }
  }
}