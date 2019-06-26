import React, { Component } from 'react'
import styled from 'styled-components';
import {
  Button,
  Loading
} from '../controller-space'

class ControllerSpace extends Component<any> {
  render() {
    return (
      <WrappAll>
        <Button>Button</Button>
        <Loading />
      </WrappAll>
    )
  }
}

const WrappAll = styled.div`
  width: 350px;
  height: 500px;
`

export default ControllerSpace
