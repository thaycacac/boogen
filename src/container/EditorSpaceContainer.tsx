import CoreContainer from './CoreContainer'

class EditorSpaceContainer extends CoreContainer {
  state = {
    selected: null
  }
}

export default new EditorSpaceContainer({
  selected: null
})
