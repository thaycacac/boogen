import { Container } from 'unstated'
import uuid from 'uuid'
import StoreElement from './StoreElement'
class CoreContainer extends Container<any> {
  
  constructor(state: any) {
    super()
    let { children, id } = state
    
    if(!id) id=uuid()
    if(!children) children = []

    this.state = {...state, ...{id}}
    console.log('container in container/CoreContainer', this)
    StoreElement.set(id, this)
  }

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }
}

export default CoreContainer
