import React, { Component } from 'react'
import styled from 'styled-components'

interface ILoading {
  keyButton?: number,
}

class Loading extends Component<ILoading> {
  render() {
    return (
      <UILoading />
    )
  }
}

const UILoading = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #222;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 10px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export default Loading
