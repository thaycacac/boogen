const fakeData = [
  { id: 0, type: 'Section', children: [1] },
  {
    id: 1, type: 'Button', children: [2], styles: {
      backgroundColor: 'red'
    }
  },
  { id: 2, type: 'Text', data: { value: 'Button' } }
]

function ConvertDataToContainer () {
  const rootData = fakeData.find(item => item.id === 1)
  const addItem = (rootData: any) => {
    if (rootData.children) {
      const listChildren = fakeData.filter(
        element => rootData.children.includes(element.id)
      )
      listChildren.map(child => {
        const element: any = addItem(child)
        const id = element.state.id
        rootData.children = []
        rootData.children.push(id)
      })
    }
  }
  return addItem(rootData)
}

export {
  ConvertDataToContainer
}