
import React from 'react'
import { SubcribeStyle } from '../container/StyleContainer'
import { ButtonController, InputController } from '../element/controller'
export const ContainerContext = React.createContext(null) as any

export default function BindControl(ElementController: any) {
  return (props: any) => {
    const [key, value] = props.bind.split('.')
    return <ContainerContext.Consumer>
      {
        (containerContext: any) => {
          const { domElement, id } = containerContext.state
          return <SubcribeStyle
            to={containerContext}
            bind={''}
            key={id}>
            return <ElementController />
          </SubcribeStyle>
        }
      }
    </ContainerContext.Consumer>
  }
}

export const BindInputController = BindControl(InputController)
export const BindButtonController = BindControl(ButtonController)
