import React, { Component } from 'react'
import styled from 'styled-components'
import { elementData } from '../../utils'
import INTERACTION from '../../reuse/interaction'

class ElementorSpace extends Component<any> {
  handleDragStart = (event: any) => {
    event.stopPropagation()
    const data = event.target.dataset.element
    INTERACTION.category = 'DRAG'
    event.dataTransfer.setData('element', data)
  }

  render() {
    return (
      <WrapAll>
        <Label>Components</Label>
        <WrapItem>
          {elementData.map((item, index) => {
            const dataString: any = JSON.stringify(item)
            return (
              <DrapItem
                key={`element-${index}`}
                onDragStartCapture={this.handleDragStart}
                data-element={dataString}
                draggable
              >
                <img
                  src={require(`../../assets/images/${item[0].type}.png`)}
                  alt={`element ${item[0].name}`}
                />
                <Label>{item[0].name}</Label>
              </DrapItem>
            )
          })}
        </WrapItem>
      </WrapAll>
    )
  }
}

const WrapAll = styled.div`
  width: 200px;
  padding: 10px;
  overflow: scroll;
  background: #353a3d;
  .demo {
    margin: 10px;
  }
`

const WrapItem = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DrapItem = styled.div`
  border: 1px solid #2e2f33;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
  border-radius: 5px;
  background: #4b5155;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 10px 5px;
  cursor: all-scroll;
  width: 85px;
  flex: auto;
  &:nth-child(2n + 1) {
    margin-right: 6px;
  }
  &:hover {
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.5);
  }
  img {
    width: 45px;
    margin: 0 auto 0px auto;
    display: block;
    user-drag: none;
  }
`

const Label = styled.label`
  text-align: center;
  color: #fdfdfd;
  border-bottom: 2px solid transparent;
  font-size: 9px;
  text-transform: uppercase;
  transition: color 0.1s ease-in-out;
  margin: 0px;
`

export default ElementorSpace
