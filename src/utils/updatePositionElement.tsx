import INTERACTION from '../reuse/interaction'
import { StoreElement } from '../container'

function updatePositionElement(dragId: string, dropId: string ) {
  const dropContainer = StoreElement.get(dropId)
  const dropChildren = dropContainer.state.children
  let parentDropContainer = null
  let parentDropChildren = null

  /**
   * If user don't click body editor and position is not inside,
   * then change drop is parent of element current
   */
  if (dropContainer.state.type !== 'Body' &&
    INTERACTION.position !== 'INSIDE'
  ) {
    parentDropContainer = StoreElement.get(dropContainer.state.parentId)
    parentDropChildren = parentDropContainer.state.children
  }
  /**
   * If user click body(it's root) and position is not inside,
   * the system just can push inside
   */
  else if(dropContainer.state.type === 'Body' &&
    INTERACTION.position !== 'INSIDE') {
    dropChildren.push(dragId)
    dropContainer.setState({ children: dropChildren })
    INTERACTION.reset()
  }
  switch(INTERACTION.position) {
    case 'INSIDE':
      dropChildren.push(dragId)
      dropContainer.setState({ children: dropChildren })
      INTERACTION.reset()
      return
    case 'BOTTOM':
      parentDropChildren.push(dragId)
      break
    case 'TOP':
      parentDropChildren.unshift(dragId)
      break
    case 'LEFT':
      let indexDragLeft = parentDropChildren.indexOf(dropId)
      parentDropChildren.splice(indexDragLeft, 0, dragId)
      break
    case 'RIGHT':
      let indexDragRight = parentDropChildren.indexOf(dropId)
      parentDropChildren.splice(indexDragRight + 1, 0, dragId)
      break
  }
  parentDropContainer.setState({ children: parentDropChildren })
  INTERACTION.reset()
  return
}

export default updatePositionElement
