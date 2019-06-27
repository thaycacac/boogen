import React, { FunctionComponent, useRef, useState } from 'react'
import styled from 'styled-components'

interface IInput {
  value?: string | number,
  placeholder?: string,
  type?: string,
  onChange: (e: any) => any,
}

const Input:FunctionComponent<IInput> = ({
  value = '',
  placeholder = 'Please input here',
  type = 'text',
  onChange
}) => {

  const refInput = useRef(null)
  const [valueInput, setValueInput] = useState(value)

  const handleOnChange = (e: any) => {
    onChange(e.target.value)
    setValueInput(e.target.value)
  }
  return(
    <UIInput
      value={valueInput}
      placeholder={placeholder}
      type={type}
      ref={refInput}
      onChange={handleOnChange}
    />
  )
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
