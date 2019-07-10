import React, { FunctionComponent, useRef, useState } from 'react'
import styled from 'styled-components'
import { EditorSpaceContainer } from '../../../container'

interface IMultipleInput {
  label: string
  placeholder?: string,
  type?: string,
  typeChange: 'style' | 'text'
  keyCSS?: string,
  container: any
}

const MultipleInput:FunctionComponent<IMultipleInput> = ({
  label = 'Content',
  type = 'text',
  typeChange,
  keyCSS,
  container
}) => {

  const [top, updateTop] = useState(container.getStyle(keyCSS + '-top'))
  const [left, updateLeft] = useState(container.getStyle(keyCSS + '-left'))
  const [right, updateRight] = useState(container.getStyle(keyCSS + '-right'))
  const [bottom, updateBottom] = useState(container.getStyle(keyCSS + '-bottom'))

  const handleOnChange = (e: any, position: string) => {
    if (typeChange === 'style') {
      switch(position) {
        case 'top':
          container.setStyle(keyCSS + '-top', e.target.value)
          updateTop(e.target.value)
          break
        case 'left':
          container.setStyle(keyCSS + '-left', e.target.value)
          updateLeft(e.target.value)
          break
        case 'right':
          container.setStyle(keyCSS + '-right', e.target.value)
          updateRight(e.target.value)
          break
        case 'bottom':
          container.setStyle(keyCSS + '-bottom', e.target.value)
          updateBottom(e.target.value)
          break
      }
      EditorSpaceContainer.setState({
        selectedId: container.state.id
      }, null)
    }
  }
  const refInput = useRef(null)

  return(
    <>
      <UILabel>{ label }</UILabel>
      <UIInput
        placeholder="TOP"
        type={type}
        value={top}
        ref={refInput}
        onChange={(e: any) => handleOnChange(e, 'top')}
      />
      <WrapCenter>
        <UIInput
          placeholder="LEFT"
          type={type}
          value={left}
          ref={refInput}
          onChange={(e: any) => handleOnChange(e, 'left')}
        />
        <UIInput
          placeholder="RIGHT"
          type={type}
          value={right}
          ref={refInput}
          onChange={(e: any) => handleOnChange(e, 'right')}
        />
      </WrapCenter>
      <UIInput
        placeholder="BOTTOM"
        type={type}
        value={bottom}
        ref={refInput}
        onChange={(e: any) => handleOnChange(e, 'bottom')}
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
  text-align: center;

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

const WrapCenter = styled.div`
  display: flex;
  input {
    border-top: 0;
    border-bottom: 0;
    &:first-child {
      border-right: 0;
    }
  }
`

export default MultipleInput
