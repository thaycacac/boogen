import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { updateSelectedElement } from '../../../utils'

interface ISelect {
  label: string
  listData: Array<object>
  container: any
  handleChange: (e: any) => void
}

const Select: FunctionComponent<ISelect> = ({
  label = 'Content',
  listData = [],
  container,
  handleChange,
}) => {
  const handleOnChange = (e: any) => {
    handleChange(e.target.value)
    updateSelectedElement(container.state.id)
  }

  return (
    <>
      <UILabel>{label}</UILabel>
      <UISelect onChange={e => handleOnChange(e)}>
        {listData.map((item: any) => (
          <option value={item.value}>{item.name}</option>
        ))}
      </UISelect>
    </>
  )
}

const UISelect = styled.select`
  height: 40px;
  vertical-align: middle;
  display: inline-block;
  max-width: 100%;
  width: 100%;
  padding: 0 10px;
  background: #fff;
  color: #666;
  border: 1px solid #e5e5e5;
  transition: 0.2s ease-in-out;
  border-radius: 0;
  -webkit-appearance: none;
  overflow: visible;
  box-sizing: border-box;
  transition-property: color, background-color, border;

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
  transition: color 0.1s ease-in-out;
  margin-top: 15px;
`

export default Select
