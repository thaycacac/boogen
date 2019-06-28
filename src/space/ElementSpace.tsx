import React, { Component } from 'react'
import styled from 'styled-components'
import { fakeData } from '../utils'
import INTERACTION from '../reuse/interaction'

class ElementorSpace extends Component<any> {

  handleDragStart = (event: any) => {
    event.stopPropagation()
    const data = event.target.dataset.element
    INTERACTION.category = 'DRAG'
    event.dataTransfer.setData('element', data)
  }

  render() {
    const listElement = ['div', 'a', 'span', 'button', 'input', 'section']
    return (
      <WrapAll>{
          listElement.map((item, index) => (
            <DrapItem
              key={index}
              onDragStartCapture={this.handleDragStart}
              data-element={item}
              draggable
            >
              {item}
            </DrapItem>
          ))
        }
        {
          fakeData.map((item, index) => {
            const dataString = JSON.stringify(item)
            return <DrapItem
              key={index}
              onDragStartCapture={this.handleDragStart}
              data-element={dataString}
              draggable
            />
          })
        }
      </WrapAll>
    )
  }
}

const WrapAll = styled.div`
  width: 250px;
  height: calc(100vh - 60px);
  overflow: scroll;
  .demo {
    margin: 10px;
  }
`

const DrapItem = styled.div`
  width : auto;
  height : 30px;
  background : red;
  margin: 20px;
`

export default ElementorSpace
