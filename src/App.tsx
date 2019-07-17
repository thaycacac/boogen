import React from 'react'
import styled from 'styled-components'
import ThemeProviderContext from './theme'
import { Provider } from 'unstated'
import { NavbarSpace, EditorSpace, ControllerSpace, ElementorSpace, FooterSpace } from './space'

const App: React.FC = () => {
  return (
    <ThemeProviderContext>
      <Provider>
        <WrapApp>
          <NavbarSpace className="header-space" />
          <div className="main-space">
            <ElementorSpace />
            <EditorSpace />
            <ControllerSpace />
          </div>
          <FooterSpace className="footer-space" />
        </WrapApp>
      </Provider>
    </ThemeProviderContext>
  )
}

const WrapApp = styled.div`
  width: 100vw;
  height: 100vh;
  .main-space {
    display: flex;
    height: calc(100vh - 60px);
  }
`

export default App
