import ElementContainer from '../container/ElementContainer'
import INTERACTION from '../reuse/interaction'
import { StoreElement } from '../container'

const fakeData = [
  [
    { id: 1, type: 'Button', children: [2] },
    {
      id: 2, type: 'Button', children: [], styles: {
        backgroundColor: 'red'
      }
    },
    { id: 3, type: 'Text', data: { value: 'Button' } }
  ],
  [
    { id: 1, type: 'Section', children: [2] } ,
    {
      id : 2 , type : 'Input' ,styles: {
        backgroundColor: 'red'
      },
      children: []
    }
  ]
]

const addItem = (rootData: any): any => {
  if (rootData.children) {
    // TODO: change this in fake data
    const listChildren = fakeData[0].filter(
      (element: any) => rootData.children.includes(element.id)
    )
    listChildren.map((child: any) => {
      const element: any = addItem(child)
      const id = element.state.id
      rootData.children = []
      rootData.children.push(id)
      return null
    })
  }
  return new ElementContainer(rootData)
}

function ConvertDataToContainer(data: any) {
  // get root data
  const rootData = JSON.parse(data).find(
    (item: any) => item.id === 1
  )
  return addItem(rootData)
}

function UpdatePositionElement(dragId: string, dropId: string ): void {
  const dropContainer = StoreElement.get(dropId)
  const dragContainer = StoreElement.get(dragId)
  const dropParent = dropContainer.state.parentId
  const dragChildren = dragContainer.state.children
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
export {
  fakeData,
  ConvertDataToContainer,
  UpdatePositionElement
}

export { default as getElementCanInteract } from './getElementCanInteract'
