import { Provider, Subscribe } from 'unstated'
import { StoreElement } from '../container'
import { string } from 'prop-types';

function RenderElement(id: string, parentId: string) {
  // get element container from store
  const elementContainer = StoreElement.get(id)
  // get name type of container
  const { type } = elementContainer.state
  return null
}

export default RenderElement
