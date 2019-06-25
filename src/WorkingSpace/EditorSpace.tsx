import * as React from 'react'
import styled from 'styled-components'
import INTERATION from '../reuse/interaction'

class EditorSpace extends React.Component<any> {
  refSel!: HTMLElement;
  refFlow: HTMLElement
  | undefined

  handleDragStart = (event: any) => {
    event.stopPropagation()
    const data = event.target.dataset.element
    console.log('data start', data)
    event.dataTransfer.setData('element', data)
  }

  handleDrapOverCapture = (event: any) => {
    event.preventDefault()

    const target = event.target as HTMLElement
    const { width, height, top, left } = target.getBoundingClientRect()
    
    Object.assign(this.refSel.style, {
      width: width + 'px',
      height: height + 'px',
      top: top + 'px',
      left: left + 'px',
      display: 'block'
    })
    
    const positionX = event.nativeEvent.offsetX
    const positionY = event.nativeEvent.offsetY
    const scrollTop = window.scrollY
    console.log('position: ', positionX, positionY)
    const distance = 7
    
    let caseTest: String = ''
    if (positionX > 0 && positionX < distance) {
      caseTest = 'left'
      if(this.refFlow) {
        console.log('case: left')
        this.refFlow.style.display = 'block'
        this.refFlow.style.width = '3px'
        this.refFlow.style.height = height + 'px'
        this.refFlow.style.left = left + 'px'
        this.refFlow.style.top = (top + scrollTop) + 'px'
      }
    } else if (positionX > width - distance && positionX < width) {
      caseTest = 'right'
      if(this.refFlow) {
        this.refFlow.style.display = 'block'
        this.refFlow.style.width = '3px'
        this.refFlow.style.height = height + 'px'
        this.refFlow.style.left = left + width + 'px'
        this.refFlow.style.top = (top + scrollTop) + 'px'
      }
    } else if (positionY > 0 && positionY < distance) {
      caseTest = 'top'
      if(this.refFlow) {
        this.refFlow.style.display = 'block'
        this.refFlow.style.width = width + 'px'
        this.refFlow.style.height = '3px'
        this.refFlow.style.left = left + 'px'
        this.refFlow.style.top = (top + scrollTop) + 'px'
      }
    } else if (positionY < height && positionY > (height - distance)) {
      caseTest = 'bottom'
      if ( this.refFlow) {
        this.refFlow.style.display = 'block'
        this.refFlow.style.width = width + 'px'
        this.refFlow.style.height = '3px'
        this.refFlow.style.left = left + 'px'
        this.refFlow.style.top = (top + scrollTop) + height + 'px'
      }
    } else {
      caseTest = 'inside'
      if ( this.refFlow) {
        this.refFlow.style.display = 'none'
      }
    }
    INTERATION.position = caseTest
  }

  handleDragLeaveCapture = (event: any) => {
    console.log('Leave', event.target)
  }

  handleDropCapture = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    const nameDom = event.dataTransfer.getData('element')
    console.log('Target Drop element: ', event.target)
    console.log('Name Drop element: ', nameDom)

    // check exist
    if (!nameDom || nameDom.length === 0) return

    // create new Dom
    const dom = document.createElement(nameDom) as HTMLElement
    dom.innerHTML = nameDom
    dom.setAttribute('draggable', 'true')
    dom.setAttribute('data-element', nameDom)
    const section = document.createElement('section')
    console.log('INTERATION.position',INTERATION.position)
    switch (INTERATION.position) {
      case 'bottom':
        event.target.parentElement.appendChild(dom)
        break;
      case 'top':
        event.target.parentElement.appendChild(section.appendChild(dom),'section')
        break;
      case 'left':
        event.target.before(dom)
        break;
      case 'right':
        event.target.after(dom)
        break;
      default: event.target.appendChild(dom)
    }
    console.dir(event.target.parentElement)
    
    INTERATION.reset()

    if ( this.refFlow) {
        this.refSel.style.display = 'none'
        this.refFlow.style.display = 'none'
    }
  }

  render() {
    const listElement = ['div', 'a', 'span', 'button', 'input', 'section']
    return <>
      <WrapperEditorSpace
        draggable
        onDragStartCapture={this.handleDragStart}
        onDragOverCapture={this.handleDrapOverCapture}
        onDragLeaveCapture={this.handleDragLeaveCapture}
        onDropCapture={this.handleDropCapture}
        >
        <Selection ref={e => this.refSel = e as HTMLInputElement} />
        <Flow ref={e => this.refFlow = e as HTMLInputElement}/>
        <Inspetor>
          {
            listElement.map((item, index) => (
              <DragItem
                key={index}
                data-element={item}
                draggable
              >
                {item}
              </DragItem>
            ))
          }
        </Inspetor>
      </WrapperEditorSpace>
    </>
  }
}

const WrapperEditorSpace = styled.div`
  width: 100%;
  height: 100vh;
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

const Selection = styled.div`
  position: fixed;
	box-sizing: border-box;
	border: 2px solid red;
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

const Inspetor = styled.div`
  display : flex;
`

const DragItem = styled.div`
  width: 50px;
  background: red;
  margin: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
export default EditorSpace
