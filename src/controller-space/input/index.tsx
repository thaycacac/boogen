import React, { Component } from 'react'
import styled from 'styled-components'

interface IInput {
  value?: string | number,
  placeholder: string,
  type: string,
  refInput?: string,
  autoFocus?: boolean,
  onChange?: (e: any) => any,
  onKeyPress?: (e: any) => any,
  onForcus?: (e:any) => any,
}

class Input extends Component<IInput> {
  inputRef: any = React.createRef()
  state = {
    isFocus: false
  }

  handleOnChange = (e: any) => {
    console.log("this.inputRef.value", this.inputRef.value)
    if (this.props.onChange)
      this.props.onChange(e.target.value)
  }

  render() {
    const {
      value,
      placeholder,
      type,
      refInput,
      autoFocus,
      onChange,
      onKeyPress,
      onForcus,
    } = this.props
    return(
      <UIInput
        value={value}
        placeholder={placeholder}
        type={type}
        // ref={ref}
        autoFocus={autoFocus}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={onForcus}
      />
    )
  }
}

const UIInput = styled.input`
  height: 40px;
  vertical-align: middle;
  display: inline-block;
  max-width: 100%;
  width: 100%;
  padding: 0 10px;
  background: #fff;
  color: #666;
  border: 1px solid #e5e5e5;
  transition: .2s ease-in-out;
  overflow: visible;
  box-sizing: border-box;
  transition-property: color,background-color,border;
  
  &:focus {
    border-color: #666;
    outline-width: 0;
  }
`

export default Input
