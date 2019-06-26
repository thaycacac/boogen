import React from 'react'
import styled from 'styled-components'
import ThemeProviderContext from './theme'
import {
  NavbarSpace,
  EditorSpace,
  ControllerSpace,
  FooterSpace,
  ElementorSpace
} from './space'

const App: React.FC = () => {
  return (
    <ThemeProviderContext>
      <WrapApp>
        <NavbarSpace className="header-space" />
        <div className="main-space">
          <ElementorSpace />
          <EditorSpace />
          <ControllerSpace />
        </div>
        <FooterSpace className="footer-space" />
      </WrapApp>
    </ThemeProviderContext>
  );
}

const WrapApp = styled.div`
  width: 100vw;
  height: 100vh;
  .main-space {
    display: flex;
    height: calc(100vh - 61px);
  }
`

export default App;
