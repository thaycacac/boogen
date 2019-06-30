import ElementContainer from '../container/ElementContainer'
import fakeData from './fakeData'

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

function convertDataToContainer(data: any) {
  // get root data
  const rootData = JSON.parse(data).find(
    (item: any) => item.id === 1
  )
  return addItem(rootData)
}

export default convertDataToContainer
