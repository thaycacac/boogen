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
        {
          elementData.map((item, index) => {
            const dataString: any = JSON.stringify(item)
            return (
              <>
                <Label>{ item[0].name }</Label>
                <DrapItem
                  key={`element-${index}`}
                  onDragStartCapture={this.handleDragStart}
                  data-element={dataString}
                  draggable
                  src={require('../../assets/images/button.png')}
                />
            </>
            )
          })
        }
      </WrapAll>
    )
  }
}

const WrapAll = styled.div`
  width: 180px;
  padding: 10px;
  height: calc(100vh - 60px);
  overflow: scroll;
  .demo {
    margin: 10px;
  }
`

const DrapItem = styled.img`
  width: 150px;
  margin: 10px 0 15px 0;
  display: block;
`

const Label = styled.label`
  text-align: center;
  color: #484848;
  border-bottom: 2px solid transparent;
  font-size: 11px;
  text-transform: uppercase;
  transition: color .1s ease-in-out;
  margin-top: 15px;
`

export default ElementorSpace
