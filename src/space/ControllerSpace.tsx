import React, { Component } from 'react'
import styled from 'styled-components';

class ControllerSpace extends Component<any> {
  render() {
    return (
      <WrappAll>
        <div>Controller Space</div>
      </WrappAll>
    )
  }
}

const WrappAll = styled.div`
  width: 350px;
  height: 500px;
`

export default ControllerSpace
