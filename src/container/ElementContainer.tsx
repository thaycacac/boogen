import StoreElement from './StoreElement'
import CoreContainer from './CoreContainer'

class ElementContainer extends CoreContainer {

  static getElement(id: string) {
    return StoreElement.get(id)
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
