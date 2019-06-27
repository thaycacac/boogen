import CoreContainer from './CoreContainer'

class HistoryContainer extends CoreContainer {
  undo = []
  redo = []

  constructor(state: any) {
    super(state)
  }

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }
}

export default HistoryContainer
