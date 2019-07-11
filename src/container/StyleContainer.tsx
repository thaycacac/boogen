import { Container } from 'unstated'


type StyleState = {
  instance: any
}

class StyleContainer extends Container<StyleState> {
  state = {
    instance: null
  }

}

export default new StyleContainer()
