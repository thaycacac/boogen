import React, { Component } from 'react'
import styled from 'styled-components'

interface IButton {
  click?: (e: any) => any
  keyButton?: number
}

class Button extends Component<IButton> {
  render() {
    return <UIButton onClick={this.props.click}>{this.props.children}</UIButton>
  }
}

const UIButton = styled.button`
  background-color: #222;
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  margin: 0;
  display: inline-block;
  box-sizing: border-box;
  padding: 0 30px;
  vertical-align: middle;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.1s ease-in-out;
  transition-property: color, background-color, border-color;
`

export default Button
