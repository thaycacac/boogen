import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

interface ICustom {
  label: string
  container: any
}

const Custom:FunctionComponent<ICustom> = ({
  label = 'Content',
  container
}) => {

  const [value, updateValue] = useState(container.getAllStyle())

  useEffect(() => {
    updateValue(container.getAllStyle())
  }, [container.state.id])

  const handleOnChange = (e: any) => {
    container.setCustomStyle(e.target.value)
    updateValue(e.target.value)
  }
  const refInput = useRef(null)

  return(
    <>
      <UILabel>{ label }</UILabel>
      <UITextarea
        rows={10}
        value={value}
        ref={refInput}
        onChange={handleOnChange}
      />
    </>
  )
}

const UITextarea = styled.textarea`
  vertical-align: middle;
  display: inline-block;
  max-width: 100%;
  width: 100%;
  padding: 10px;
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

const UILabel = styled.label`
  text-align: center;
  color: #484848;
  border-bottom: 2px solid transparent;
  font-size: 9px;
  text-transform: uppercase;
  transition: color .1s ease-in-out;
  margin-top: 15px;
`

export default Custom
