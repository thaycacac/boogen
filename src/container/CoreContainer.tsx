import { Container } from 'unstated'
import uuid from 'uuid'
import StoreElement from './StoreElement'
class CoreContainer extends Container<any> {
  
  constructor(state: any) {
    super()
    let { children = [], id, data = {} } = state
    if(!id || typeof id === 'number') id=uuid()

    this.state = {...state, ...{id}, ...{children}, ...{data}}
    console.log('Container in container/CoreContainer', this)
    StoreElement.set(id, this)
  }

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }
}

export default CoreContainer
