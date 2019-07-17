import React from 'react'
import { Subscribe } from 'unstated'
import { StoreElement } from '../container'
import ListElement from '../element/editor'
import StyleContext from '../space/EditorSpace/StyleContext'
import uuid from 'uuid'

function RenderElement(id: string, parentId: string) {
  // get element container from store
  const elementContainer = StoreElement.get(id)
  // get name type of container
  let type: string = elementContainer.state.type
  // get element from elemen space
  // @ts-ignore
  const Element = ListElement[type]
  return (
    <StyleContext.Consumer>
      {styleContext => {
        return (
          <Subscribe to={[elementContainer]} key={id}>
            {elementContainer => {
              const { id, children, data, styles, className } = elementContainer.state
              Object.assign(elementContainer.state, {
                parentId,
                styles,
                styleContext,
                className: className ? className : `boogen-${uuid().split('-')[0]}`,
                data: data ? data : {},
              })
              const props = {
                elementContainer,
                ref: (e: any) => (elementContainer.state.instance = e),
              }
              return (
                <Element {...props}>
                  {children.map((childrenId: string) => RenderElement(childrenId, id))}
                </Element>
              )
            }}
          </Subscribe>
        )
      }}
    </StyleContext.Consumer>
  )
}

export default RenderElement
