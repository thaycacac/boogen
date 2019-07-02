import CoreContainer from './CoreContainer'

class HistoryContainer extends CoreContainer {
  undo = []
  redo = []

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }
}

export default HistoryContainer
