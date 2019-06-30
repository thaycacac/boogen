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

export default fakeData
