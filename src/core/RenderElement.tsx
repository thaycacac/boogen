import React from 'react'
import { Provider, Subscribe } from 'unstated'
import { StoreElement } from '../container'
import ListElement from '../element-space'

function RenderElement(id: string, parentId: string) {
  const container = storeElement.get(idElement)
  // get element container from store
  const elementContainer = StoreElement.get(id)
  // get name type of container
  let type: string = elementContainer.state.type
  // get element from elemen space
  // @ts-ignore
  const element = ListElement[type]
  return <Subscribe to={[container]} key={id}>
    {
      elementContainer => {
        elementContainer.state.parentId = parentId
      }
    }
  </Subscribe>
}

export default RenderElement
