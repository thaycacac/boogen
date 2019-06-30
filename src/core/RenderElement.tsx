import React from 'react'
import { Subscribe } from 'unstated'
import { StoreElement } from '../container'
import ListElement from '../element-space'

function RenderElement(id: string, parentId: string) {
  const container = StoreElement.get(id)
  // get element container from store
  const elementContainer = StoreElement.get(id)
  // get name type of container
  let type: string = elementContainer.state.type
  // get element from elemen space
  // @ts-ignore
  const Element = ListElement[type]
  return <Subscribe to={[container]} key={id}>
    {
      elementContainer => {
        elementContainer.state.parentId = parentId
        const { id, children, data, styles } = elementContainer.state
        const props = { ...Element.PropsDefault, ...{elementContainer}, }
        return <Element {...props}>
          {
            children.map((childrenId: string) =>
              RenderElement(childrenId, id)
            )
          }
        </Element>
      }
    }
  </Subscribe>
}

export default RenderElement
