import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import { EditorSpaceContainer } from '../../container'
import { setBorderElement } from '../../utils'

function Selection(props: any) {
  let refSel!: HTMLElement

  useEffect(() => {
    if (props.selectedId) {
      const { selectedId } = props
      const target: any = document.querySelector(`[data-element="${selectedId}"]`)
      const { width, height, top, left } = target.getBoundingClientRect()
      const scrollTop = window.scrollY
      setBorderElement(width, height, left, top + scrollTop, refSel)
    }
  })

  return (
    <Subscribe to={[EditorSpaceContainer]}>
      {() => {
        return <UISelection ref={e => (refSel = e as HTMLInputElement)} />
      }}
    </Subscribe>
  )
}

const UISelection = styled.div`
  position: fixed;
  box-sizing: border-box;
  border: 1px dashed green;
  pointer-events: none;
  display: none;
  background: none !important;
  z-index: 0;
`

export default Selection
