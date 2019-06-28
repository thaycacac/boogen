import React, { Component } from 'react'
import styled from 'styled-components';
import EnhanceElement from '../../core/EnhanceElement'

class Body extends Component<any> {

  static type = 'Body'

  render() {
    return (
      <UIBody>
        {this.props.children}
      </UIBody>
    )
  }
}
const UIBody = styled.div`
  width: calc(100% - 20px);
  height: calc(100vh - 81px);
`
export default EnhanceElement(Body)