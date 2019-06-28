import ElementContainer from '../container/ElementContainer'

const fakeData = [
  { id: 'abcde', type: 'Section', children: [1] },
  {
    id: 'fhgik', type: 'Button', children: [2], styles: {
      backgroundColor: 'red'
    }
  },
  { id: 'lmnop', type: 'Text', data: { value: 'Button' } }
]

function ConvertDataToContainer () {
  const rootData = fakeData.find(item => item.id === 'abcde')
  const addItem = (rootData: any) => {
    if (rootData.children) {
      const listChildren = fakeData.filter(
        element => rootData.children.includes(element.id)
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

export {
  ConvertDataToContainer
}