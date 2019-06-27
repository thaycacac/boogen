import { Container } from 'unstated'
import uuid from 'uuid'

const storeElement = new Map()

class BaseContainer extends Container<any> {
  
  constructors(state: any) {
    let { id, children } = state
    
    id ? id : id=uuid()
    children ? children : this.state.children = []

    this.state = {...state, ...{id}}
    console.log('this of container', this)
    storeElement.set(id, this)
  }

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }
}

export default BaseContainer
