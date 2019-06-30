import React, { Component } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import { EditorSpaceContainer, StoreElement }from '../../container'

class Selection extends Component<any> {
  refSel!: HTMLElement

  updatePosition = () => {
    const { selectedId } = this.props
    const target: any = document.querySelector(`[data-element="${selectedId}"]`)
    const { width, height, top, left } = target.getBoundingClientRect()
    const scrollTop = window.scrollY
    Object.assign(this.refSel.style, {
      width: width + 'px',
      height: height + 'px',
      top: top +scrollTop+ 'px',
      left: left + 'px',
      display: 'block'
    })
  }

  componentDidUpdate(){
    this.updatePosition()
  }

  render() {
    return (
      <Subscribe to={[EditorSpaceContainer]}>
        {
          () => {
            const { selected } = EditorSpaceContainer.state
            return <UISelection ref={ e => this.refSel = e as HTMLInputElement}/>
          }
        }
      </Subscribe>
    )
  }
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
