import { Provider, Subscribe } from 'unstated'
import { StoreElement } from '../container'
import { string } from 'prop-types';
import ListElement from '../element-space'

function RenderElement(id: string, parentId: string) {
  // get element container from store
  const elementContainer = StoreElement.get(id)
  // get name type of container
  const type: string = elementContainer.state.type
  // get element from elemen space
  // console.log(type);
  // // const Element = ListElement[type]
  // console.log("element", Element);
  return null
}

export default RenderElement
