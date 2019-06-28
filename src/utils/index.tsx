import ElementContainer from '../container/ElementContainer'
import INTERACTION from '../reuse/interaction'
import { StoreElement } from '../container'

const fakeData = [
  [
      { id: 'a', type: 'Section', children: ['b', 'c'] },
      {
          id: 'b', type: 'Button', children: ['c'], styles: {
              backgroundColor: 'red'
          }
      },
      { id: 'c', type: 'Text', data: { value: 'Button' } }
  ],
  [
      { id: 'a', type: 'Section', children: ['b'] } ,
      {
          id : 'b' , type : 'Input' ,tyles: {
              backgroundColor: 'red'
          }
      }
  ]
]

function ConvertDataToContainer(data: any) {
  const rootData = JSON.parse(data).find(
    (item: any) => item.id === 'a'
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

function UpdatePositionElement(dropId: string, rootId: string ) {
  const rootContainer = StoreElement.get(rootId)
  const { parentId } = rootContainer.state
  return null
}
export {
  fakeData,
  ConvertDataToContainer,
  UpdatePositionElement
}
