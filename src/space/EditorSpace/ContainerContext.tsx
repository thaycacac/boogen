import React from 'react'
import { EditorSpaceContainer, StoreElement } from '../../container'
import { Subscribe } from 'unstated'
export const ContainerContext = React.createContext(null)

function ContainerWrapAll({children}: any) {
  return <Subscribe to={[EditorSpaceContainer]}>{
    container => {
      const id = container.state.selectedId
      const elementContainer = StoreElement.get(id)
      return <ContainerContext.Provider value={elementContainer}>
        { children }
      </ContainerContext.Provider>
    }
  }
  </Subscribe>
}

export default ContainerWrapAll
