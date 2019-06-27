import CoreContainer from './CoreContainer'

class ElementContainer extends CoreContainer {

  constructor(state: any) {
    super(state)
  }

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }

  addItem(idItem: string | number, idParent: string | number) {

  }

  setStyle() {
    return () => {
      console.log('set style')
    }
  }

  getStyle() {
    return () => {
      console.log('get style')
    }
  }

}

export default ElementContainer
