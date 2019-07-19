import { Component } from 'react'
import uuid from 'uuid'
import { ElementContainer } from '../../../container'
import RenderElement from '../../../core/RenderElement'
import { updateSelectedElement } from '../../../utils'

const initIdPage = uuid()
const initIdSection = uuid()

// Auto run and create element container
const initData = {
  idPage: new ElementContainer({
    id: initIdPage,
    type: 'Body',
    children: [initIdSection],
  }),
  idSection: new ElementContainer({
    id: initIdSection,
    type: 'Section',
    children: [],
  }),
}

class Page extends Component<any> {
  static type = 'Page'

  render() {
    updateSelectedElement(initIdPage)
    return RenderElement(initIdPage, '')
  }
}

export default Page
