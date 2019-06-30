import React, { Component } from 'react'
import styled from 'styled-components';
import {
  Button,
  Loading,
  Input
} from '../../controller-space'

class ControllerSpace extends Component<any> {

  constructor(props: any) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <WrappAll>
        <Button>Button</Button>
        <Loading />
        <Input
          placeholder="Hello world"
          type="text"
          value="15"
          onChange={e => {
            this.setState({
              text: e
            })
          }}
        />
      </WrappAll>
    )
  }
}

const WrappAll = styled.div`
  width: 350px;
  height: 500px;
`

export default ControllerSpace
