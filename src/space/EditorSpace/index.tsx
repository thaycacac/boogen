import * as React from 'react'
import styled from 'styled-components'
import Selection from './Selection'
import INTERACTION, { TypePosition } from '../../reuse/interaction'
import {
  convertDataToContainer,
  updatePositionElement,
  getElementCanInteract,
  setBorderElement
} from '../../utils'
import { Page } from '../../element/editor'
import { EditorSpaceContainer, StoreElement } from '../../container'
import { Subscribe } from 'unstated'

class EditorSpace extends React.Component<any> {
  dropElement!: HTMLElement
  refFlow: HTMLElement
  | undefined

  handleDragStartCapture = (event: any) => {
    event.stopPropagation()
    INTERACTION.category='MOVE'
  }

  handleDrapOverCapture = (event: any) => {
    event.preventDefault()

    const target = event.target.closest('[data-element]')
    if(!target) return

    const { width, height, top, left } = target.getBoundingClientRect()

    setBorderElement(width + 2, height + 2, left, top, this.dropElement as HTMLElement)

    const positionX = event.nativeEvent.offsetX
    const positionY = event.nativeEvent.offsetY
    const scrollTop = window.scrollY
    const distance = 7

    let casePosition: TypePosition = ''
    if (positionX > 0 && positionX < distance) {
      casePosition = 'LEFT'
      setBorderElement(3, height, left, top +scrollTop, this.refFlow as HTMLElement)
    } else if (positionX > width - distance && positionX < width) {
      casePosition = 'RIGHT'
      setBorderElement(2, height, left + width, top + scrollTop, this.refFlow as HTMLElement)
    } else if (positionY > 0 && positionY < distance) {
      casePosition = 'TOP'
      setBorderElement(width, 2, left, top + scrollTop, this.refFlow as HTMLElement)
    } else if (positionY < height && positionY > (height - distance)) {
      casePosition = 'BOTTOM'
      setBorderElement(width, 2, left, top + height + scrollTop, this.refFlow as HTMLElement)
    } else {
      casePosition = 'INSIDE'
      if ( this.refFlow) {
        this.refFlow.style.display = 'none'
      }
    }
    INTERACTION.position = casePosition
  }

  handleDragLeaveCapture = (event: any) => {
    console.log('Leave', event.target)
  }

  handleDropCapture = (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const domDrop = getElementCanInteract(event)
    // element can't drop
    if(!domDrop) return
    let dropId  = domDrop.dataset.element

    let dragId: string = ''
    switch(INTERACTION.category) {
      case 'DRAG':
        const nameDom = event.dataTransfer.getData("element")
        const containerElement = convertDataToContainer(nameDom)
        dragId = containerElement.state.id
        break
      case 'MOVE':
        const { selectedId } = EditorSpaceContainer.state
        const elementContainer = StoreElement.get(selectedId)
        const { id, parentId } = elementContainer.state
        dragId = id

        const parentContainer = StoreElement.get(parentId)
        const newChildrenOfParent = parentContainer.state.children.filter(
          (children: string) => children !== id
        )
        parentContainer.setState({
          children: newChildrenOfParent
        })
        EditorSpaceContainer.setState({
          selectedId: null
        }, null)
        break
    }

    updatePositionElement(dragId, dropId)
    EditorSpaceContainer.setState({
      selectedId: dragId
    }, null)

    if ( this.refFlow) {
      this.dropElement.style.display = 'none'
      this.refFlow.style.display = 'none'
    }
  }

  handleMouseDown = (event: any) => {
    const target = getElementCanInteract(event)
    if(!target) return
    const selectedId = target.dataset.element
    EditorSpaceContainer.setState({
      selectedId: selectedId
    }, null)
  }

  render() {
    return <>
      <style data-css="extra"></style>
      <style data-css="large"></style>
      <style data-css="medium"></style>
      <style data-css="small"></style>
      <WrapperEditorSpace
        onDragStartCapture={this.handleDragStartCapture}
        onDragOverCapture={this.handleDrapOverCapture}
        onDragLeaveCapture={this.handleDragLeaveCapture}
        onDropCapture={this.handleDropCapture}
        onMouseDown={this.handleMouseDown}
      >
        <Page/>
        <Flow ref={e => this.refFlow = e as HTMLInputElement}/>
        <DropHover ref={e => this.dropElement = e as HTMLInputElement} />
        <Subscribe to={[EditorSpaceContainer]}>
          {
            () => {
              const { selectedId } = EditorSpaceContainer.state
              return <Selection selectedId={selectedId} />
            }
          }
        </Subscribe>
      </WrapperEditorSpace>
    </>
  }
}

const WrapperEditorSpace = styled.div`
  width: calc(100vw - 390px);
  height: 100%;
  background: white;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
  div {
    padding: 10px;
  }
  section {
    margin: 10px;
    padding: 40px;
    background: #e4e4e4;
  }
`

const DropHover = styled.div`
  position: fixed;
	box-sizing: border-box;
	border: 2px dashed red;
	pointer-events: none;
	display: none;
  background: none !important;
  z-index: 0;
  &:after{
    position: absolute;
    top:-2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    content: '';
    border: 2px dashed red;
  }
`

const Flow = styled.div`
  position: absolute;
  pointer-events: none;
  display: none;
  z-index: 9999;
  padding: 0 !important;
  background: black !important;
`
export default EditorSpace
