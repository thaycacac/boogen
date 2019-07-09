import React, { Component } from 'react'
import styled from 'styled-components'

class NavbarSpace extends Component<any> {
  render() {
    return (
      <WrapAll>
        <p className="title">Boogen</p>
      </WrapAll>
    )
  }
}

const WrapAll = styled.div`
  height: 40px;
  background: black;
  color: white;
  display: flex;
  justify-items: center;
  align-items: center;
  .title {
    margin-left: 10px;
  }
`

export default NavbarSpace
