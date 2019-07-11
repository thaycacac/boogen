import { Component } from 'react'
import uuid from 'uuid'
import { ElementContainer } from '../../../container'
import RenderElement from '../../../core/RenderElement'
import { EditorSpaceContainer } from '../../../container'

const initIdPage = uuid()
const initIdSection  = uuid()

// eslint-disable-next-line
const initData = {
  idPage: new ElementContainer({
    id: initIdPage,
    type: 'Body',
    children: [initIdSection]
  }),
  idSection : new ElementContainer({
    id  : initIdSection ,
    type : 'Section',
    children: []
  }),
}

class Page extends Component<any> {

  static type = 'Page'

  render() {
    EditorSpaceContainer.setState({
      selectedId: initIdPage
    }, null)
    return RenderElement(initIdPage, '')
  }
}

export default Page
