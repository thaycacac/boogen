import React, { Component } from 'react'
import styled from 'styled-components'

class ElementorSpace extends Component<any> {

  handleDragStart = (event: any) => {
    event.stopPropagation()
    const data = event.target.dataset.element
    console.log('data start', data)
    event.dataTransfer.setData('element', data)
  }

  render() {
    const listElement = ['div', 'a', 'span', 'button', 'input', 'section']
    const listElementFake = [
      {
        id: 'abcde',
        type: 'Section',
        children: [1] 
      },
      {
        id: 'fhgik',
        type: 'Button',
        children: [2],
        styles: {
          backgroundColor: 'red'
        }
      },
      { id: 'lmnop',
        type: 'Text',
        data: {
          value: 'Example'
        } }
    ]
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
          listElementFake.map((item, index) => {
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
