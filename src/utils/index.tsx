import ElementContainer from '../container/ElementContainer'
import INTERACTION from '../reuse/interaction'
import { StoreElement } from '../container'

const fakeData = [
  [
    { id: 1, type: 'Section', children: [2, 2] },
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

  switch(INTERACTION.position) {
    case 'INSIDE':
      dropChildren.push(dragId)
      break
    case 'BOTTOM':
      dropChildren.push(dragId)
      break
    case 'TOP':
      dropChildren.unshift(dragId)
      break
    case 'LEFT':
      break
  }
  dropContainer.setState({ children: dropChildren })
  INTERACTION.reset()
  return
}
export {
  fakeData,
  ConvertDataToContainer,
  UpdatePositionElement
}

export { default as getElementCanInteract } from './getElementCanInteract'
