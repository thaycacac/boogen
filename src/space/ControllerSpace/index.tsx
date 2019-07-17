import React, { Component } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import { EditorSpaceContainer, StoreElement } from '../../container'
import ListElement from '../../element/editor'
class ControllerSpace extends Component<any> {
  render() {
    return (
      <Subscribe to={[EditorSpaceContainer]}>
        {editorSpaceContainer => {
          const { selectedId } = editorSpaceContainer.state
          const ElementContainer = StoreElement.get(selectedId)
          if (!ElementContainer) return null
          const { type } = ElementContainer.state
          // @ts-ignore
          const InspectorElement = ListElement[type].Inspector
          return (
            <WrappAll>
              {InspectorElement ? (
                InspectorElement(ElementContainer)
              ) : (
                <NotInspector>Not inspector</NotInspector>
              )}
            </WrappAll>
          )
        }}
      </Subscribe>
    )
  }
}

const WrappAll = styled.div`
  width: 250px;
  height: calc(100vh - 80px);
  overflow: scroll;
  padding: 10px;
`

const NotInspector = styled.div`
  text-align: center;
  color: #484848;
  border-bottom: 2px solid transparent;
  font-size: 13px;
  text-transform: uppercase;
  transition: color 0.1s ease-in-out;
  margin-top: 15px;
`

export default ControllerSpace

/**
 * When user change selected (watch by editor container)
 * Then render inspector corresponding
 */
