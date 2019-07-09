const elementData = [
  [
    {
      id: 1,
      type: 'Button',
      name: 'Button',
      children: [2],
    },
    {
      id: 2,
      type: 'Text',
      children: [],
      data: {
        value: 'Example'
      },
    },
  ],
  [
    {
      id: 1,
      type: 'Section',
      name: 'Button in Section',
      children: [2],
    },
    {
      id: 2,
      type: 'Button',
      children: [3]
    },
    {
      id: 3,
      type: 'Text',
      children: [],
      data: {
        value: 'Example'
      },
    },
  ],
  [
    {
      id: 1,
      type: 'Text',
      name: 'Text',
      children: [],
      data: {
        value: 'Example'
      },
    }
  ]
]

export default elementData
