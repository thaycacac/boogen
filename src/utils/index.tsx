import ElementContainer from '../container/ElementContainer'
import INTERACTION from '../reuse/interaction'
import { StoreElement } from '../container'

const fakeData = [
  [
      { id: 1, type: 'Button', children: [] },
      {
          id: 2, type: 'Button', children: [3], styles: {
              backgroundColor: 'red'
          }
      },
      { id: 3, type: 'Text', data: { value: 'Button' } }
  ],
  [
      { id: 1, type: 'Section', children: [2] } ,
      {
          id : 2 , type : 'Input' ,tyles: {
              backgroundColor: 'red'
          }
      }
  ]
]

function ConvertDataToContainer(data: any) {
  const rootData = JSON.parse(data).find(
    (item: any) => item.id === 1
  )
  const addItem = (rootData: any) => {
    if (rootData.children) {
      const listChildren = fakeData.filter(
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
    return new ElementContainer({...rootData, id: undefined })
  }
  return addItem(rootData)
}

function UpdatePositionElement(dragId: string, dropId: string ) {
  const dropContainer = StoreElement.get(dropId)
  const dragContainer = StoreElement.get(dragId)
  const dropParent = dropContainer.state.parentId
  const dragChildren = dragContainer.state.children
  const dropChildren = dropContainer.state.children

    if (INTERACTION.position === 'INSIDE') {
        dropChildren.push(dragId)
        dropContainer.setState({ children: dropChildren })
        return
    }

  // if (INTERACTION.position === 'INSIDE') {

  // }

  // switch(INTERACTION.position) {
  //   case 'INSIDE':
  //     dropChildren.push(dropId)
  //     dropContainer.setState({ children: dropChildren })
  //     INTERACTION.reset()
  //     return
  // }

  return null
}
export {
  fakeData,
  ConvertDataToContainer,
  UpdatePositionElement
}
