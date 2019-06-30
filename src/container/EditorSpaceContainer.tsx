import CoreContainer from './CoreContainer'

class EditorSpaceContainer extends CoreContainer {
  state = {
    selectedId: null
  }
}

export default new EditorSpaceContainer({
  selectedId: null
})
