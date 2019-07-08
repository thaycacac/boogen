const fakeData = [
  [
    {
      id: 1,
      type: 'Button',
      children: [2]
    },
    {
      id: 2,
      type: 'Text',
      children: [],
      data: {
        value: 'Text In Section'
      },
      styles: {
        backgroundColor: 'red'
      }
    },
  ],
  [
    {
      id: 1,
      type: 'Section',
      children: [2]
    },
    {
      id: 2,
      type: 'Button',
      children: [3]
    },
    {
      id: 3,
      type: 'Text',
      data: {
        value: 'Text In Section'
      },
      children: []
    },
  ],
  [
    {
      id: 1,
      type: 'Text',
      data: {
        value: 'Only Text'
      },
      children: []
    }
  ]
]

export default fakeData
