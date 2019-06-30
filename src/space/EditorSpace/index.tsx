import * as React from 'react'
import styled from 'styled-components'
import Selection from './Selection'
import INTERACTION, { TypePosition } from '../../reuse/interaction'
import {
  convertDataToContainer,
  updatePositionElement,
  getElementCanInteract
} from '../../utils'
import { Page } from '../../element-space'
import { EditorSpaceContainer, StoreElement } from '../../container'
import { Subscribe } from 'unstated';

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

    Object.assign(this.dropElement.style, {
      width: width + 2 + 'px',
      height: height + 2 + 'px',
      top: top + 'px',
      left: left + 'px',
      display: 'block'
    })

    const positionX = event.nativeEvent.offsetX
    const positionY = event.nativeEvent.offsetY
    const scrollTop = window.scrollY
    console.log('position: ', positionX, positionY)
    const distance = 7

    let casePosition: TypePosition = ''
    if (positionX > 0 && positionX < distance) {
      casePosition = 'LEFT'
      if(this.refFlow) {
        console.log('case: left')
        this.refFlow.style.display = 'block'
        this.refFlow.style.width = '3px'
        this.refFlow.style.height = height + 'px'
        this.refFlow.style.left = left + 'px'
        this.refFlow.style.top = (top + scrollTop) + 'px'
      }
    } else if (positionX > width - distance && positionX < width) {
      casePosition = 'RIGHT'
      if(this.refFlow) {
        this.refFlow.style.display = 'block'
        this.refFlow.style.width = '2px'
        this.refFlow.style.height = height + 'px'
        this.refFlow.style.left = left + width + 'px'
        this.refFlow.style.top = (top + scrollTop) + 'px'
      }
    } else if (positionY > 0 && positionY < distance) {
      casePosition = 'TOP'
      if(this.refFlow) {
        this.refFlow.style.display = 'block'
        this.refFlow.style.width = width + 'px'
        this.refFlow.style.height = '2px'
        this.refFlow.style.left = left + 'px'
        this.refFlow.style.top = (top + scrollTop) + 'px'
      }
    } else if (positionY < height && positionY > (height - distance)) {
      casePosition = 'BOTTOM'
      if ( this.refFlow) {
        this.refFlow.style.display = 'block'
        this.refFlow.style.width = width + 'px'
        this.refFlow.style.height = '2px'
        this.refFlow.style.left = left + 'px'
        this.refFlow.style.top = (top + scrollTop) + height + 'px'
      }
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
  width: 100%;
  height: 100%;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  div {
    background: #f1f1f1;
    padding: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

// show when drag over border element parent
const Flow = styled.div`
  position: absolute;
  pointer-events: none;
  display: none;
  z-index: 9999;
  padding: 0 !important;
  background: black !important;
`
export default EditorSpace
