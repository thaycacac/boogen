import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

interface IPreviewClass {
  container: any
}

const PreviewClass: FunctionComponent<IPreviewClass> = ({ container }) => {
  const [listClass, updateListClass] = useState('')

  useEffect(() => {
    updateListClass(container.getClass())
  }, [container.state.id])

  const refInput = useRef(null)

  return (
    <Wrap>
      <UILabel>Preview Class Bootstrap</UILabel>
      <UIInput placeholder="Empty" type="text" value={listClass} ref={refInput} disabled />
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  text-align: center;
`
const UIInput = styled.input`
  height: 60px;
  vertical-align: middle;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  background: #e5e5e5;
  font-size: 15px;
  display: inline-block;
  max-width: 100%;
  width: 100%;
  padding: 0 10px;
  color: #666;
  border: 1px solid #e5e5e5;
  transition: 0.2s ease-in-out;
  overflow: visible;
  box-sizing: border-box;
  transition-property: color, background-color, border;
`

const UILabel = styled.label`
  width: 100%;
  text-align: center;
  color: #484848;
  border-bottom: 2px solid transparent;
  font-size: 11px;
  text-transform: uppercase;
  transition: color 0.1s ease-in-out;
  margin-top: 15px;
`

export default PreviewClass
