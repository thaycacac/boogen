import React, { FunctionComponent, useRef, useState } from 'react'
import styled from 'styled-components'

interface IInput {
  label: string
  placeholder?: string,
  type?: string,
  typeChange: 'style' | 'text'
  keyCSS?: string,
  container: any
}

const Input:FunctionComponent<IInput> = ({
  label = 'Content',
  placeholder = 'Please input here',
  type = 'text',
  typeChange,
  keyCSS,
  container
}) => {

  const [value, updateValue] = useState(container.getStyle(keyCSS))

  const handleOnChange = (e: any) => {
    if (typeChange === 'style') {
      container.setStyle(keyCSS, e.target.value)
    }
    updateValue(e.target.value)
  }
  const refInput = useRef(null)

  return(
    <>
      <UILabel>{ label }</UILabel>
      <UIInput
        placeholder={placeholder}
        type={type}
        value={value}
        ref={refInput}
        onChange={handleOnChange}
      />
    </>
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
  margin-bottom: 10px;

  &:focus {
    border-color: #666;
    outline-width: 0;
  }
`

const UILabel = styled.label`
  text-align: center;
  color: #484848;
  border-bottom: 2px solid transparent;
  font-size: 9px;
  text-transform: uppercase;
  transition: color .1s ease-in-out;
`

export default Input
