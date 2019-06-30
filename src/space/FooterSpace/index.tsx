import React, { Component } from 'react'
import styled from 'styled-components'

class FooterSpace extends Component<any> {
  render() {
    return (
      <WrapAll>
        <div>Copyright © 2019</div>
      </WrapAll>
    )
  }
}

const WrapAll = styled.div`
  height: 20px;
  background: #9f60ff;
  color: #dcd3ff;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default FooterSpace
