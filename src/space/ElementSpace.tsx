import React, { Component } from 'react'
import styled from 'styled-components'

class ElementorSpace extends Component<any> {
  render() {
    return (
      <WrapAll>{
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(item => (
            <p>abcde</p>
          ))
        }
      </WrapAll>
    )
  }
} 

const WrapAll = styled.div`
  width: 250px;
  height: calc(100vh - 60px);
  overflow: scroll;
  .demo {
    margin: 10px;
  }
`

export default ElementorSpace
