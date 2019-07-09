import React, { Component } from 'react'
import styled from 'styled-components'

class FooterSpace extends Component<any> {
  render() {
    return (
      <WrapAll>
        <span>Thaycacac © 2019</span>
      </WrapAll>
    )
  }
}

const WrapAll = styled.footer`
  height: 20px;
  background: #535353;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 12px;
  }
`

export default FooterSpace
