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
        <Label>Basic</Label>
        {elementData.map((item, index) => {
          const dataString: any = JSON.stringify(item)
          return (
            <DrapItem
              key={`element-${index}`}
              onDragStartCapture={this.handleDragStart}
              data-element={dataString}
              draggable
            >
              <img src={require(`../../assets/images/${item[0].type}.png`)} alt="" />
              <Label>{item[0].name}</Label>
            </DrapItem>
          )
        })}
      </WrapAll>
    )
  }
}

const WrapAll = styled.div`
  width: 100px;
  padding: 10px;
  height: calc(100vh - 60px);
  overflow: scroll;
  .demo {
    margin: 10px;
  }
`

const DrapItem = styled.div`
  border: 1px solid #c3c3c3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
  border-radius: 5px;
  background: #d4d4d4;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 5px;
  cursor: all-scroll;
  &:hover {
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.5);
  }
  img {
    width: 45px;
    margin: 0 auto 0px auto;
    display: block;
  }
`

const Label = styled.label`
  text-align: center;
  color: #484848;
  border-bottom: 2px solid transparent;
  font-size: 9px;
  text-transform: uppercase;
  transition: color 0.1s ease-in-out;
  margin: 0px;
`

export default ElementorSpace
