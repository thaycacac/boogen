import INTERACTION from '../reuse/interaction'
import { StoreElement } from '../container'

function updatePositionElement(dragId: string, dropId: string) {
  const dropContainer = StoreElement.get(dropId)
  const dropChildren = dropContainer.state.children
  let parentDropContainer = null
  let parentDropChildren = null

  /**
   * If user don't click body editor and position is not inside,
   * then change drop is parent of element current
   */
  if (dropContainer.state.type !== 'Body' && INTERACTION.position !== 'INSIDE') {
    parentDropContainer = StoreElement.get(dropContainer.state.parentId)
    parentDropChildren = parentDropContainer.state.children
  } else if (dropContainer.state.type === 'Body' && INTERACTION.position !== 'INSIDE') {
  /**
   * If user click body(it's root) and position is not inside,
   * the system just can push inside
   */
    dropChildren.push(dragId)
    dropContainer.setState({ children: dropChildren })
    INTERACTION.reset()
  }
  switch (INTERACTION.position) {
    case 'INSIDE':
      if (dropChildren[dropChildren.length - 1] === dragId) {
        dropContainer.setState({ children: dropChildren })
        INTERACTION.reset()
        return
      }
      dropChildren.push(dragId)
      dropContainer.setState({ children: dropChildren })
      INTERACTION.reset()
      return
    case 'BOTTOM':
      parentDropChildren = parentDropChildren.filter((item: any) => {
        return item !== dragId
      })
      console.log('fsdfdsf', parentDropChildren)
      parentDropChildren.push(dragId)
      break
    case 'TOP':
      parentDropChildren = parentDropChildren.filter((item: any) => {
        return item !== dragId
      })
      parentDropChildren.unshift(dragId)
      break
    case 'LEFT':
      parentDropChildren = parentDropChildren.filter((item: any) => {
        return item !== dragId
      })
      let indexDragLeft = parentDropChildren.indexOf(dropId)
      if (parentDropChildren[indexDragLeft - 1] === dragId) break
      parentDropChildren.splice(indexDragLeft, 0, dragId)
      break
    case 'RIGHT':
      parentDropChildren = parentDropChildren.filter((item: any) => {
        return item !== dragId
      })
      let indexDragRight = parentDropChildren.indexOf(dropId)
      if (parentDropChildren[indexDragRight + 1] === dragId) break
      parentDropChildren.splice(indexDragRight + 1, 0, dragId)
      break
  }
  parentDropContainer.setState({ children: parentDropChildren })
  INTERACTION.reset()
  return
}

export default updatePositionElement
