import StoreElement from './StoreElement'
import CoreContainer from './CoreContainer'
import StyleContainer from './StyleContainer'
import { camelCase } from 'lodash'

class ElementContainer extends CoreContainer {

  instanceStyle: any = null
  styles = new StyleContainer()
  listenerStyle = [] as any[]

  constructor(state: any) {
    super(state)
  }

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }

  setStyle(state: any) {
    const styles = this.getStyle
    // TODO: read more
    const arrState = Object.entries(state)[0]
    // @ts-ignore
    styles.style[arrState[0]] = arrState[1]
  }

  getStyle() {
    const { className } = this.state
    // have 3 styleSheet, and styleSheet of Editor space is 1(check by console.log)
    const instanceStyleOfEditor: any = document.styleSheets[1]
    const arrayInstanceStyle = Array.from(instanceStyleOfEditor.cssRules)
    const ruleOfThisElement = arrayInstanceStyle.find(
      (rule: any) => rule.selectorText === `.${className}`
    )
    console.log('getStyle of', className, 'in container/ElementContainer', ruleOfThisElement)
    if (!ruleOfThisElement) {
      instanceStyleOfEditor.insertRule(`.${className}{}`, arrayInstanceStyle.length)
      return instanceStyleOfEditor.cssRule[arrayInstanceStyle.length]
    }
    return ruleOfThisElement
  }

  // TODO: read more
  getSelector(): string {
    return this.state.componentStyle.lastClassName
  }

  checkExistRule(styleSheet: any) {
    const check = Array.from(
      styleSheet.cssRules
    ).find(
      (rule: any) => rule.selectorText.includes(this.getSelector()))
    return check
  }

  setStyleString(css: any) {
    const selector = this.getSelector()
    const { styleSheet } = this.state
    if (!this.checkExistRule(styleSheet)) {
      styleSheet.insertRules(`.${selector}{${css}}`, styleSheet.length)
    } else {
      const arrayInstanceStyle = Array.from(styleSheet.cssRules)
      const ruleOfThisElement: any = arrayInstanceStyle.find(
        (rule: any) => rule.selectorText.includes(this.getSelector())
      )
      const cssCamelCase = camelCase(css)
      const array = cssCamelCase.split(':')
      const methodCss = camelCase(array[0])
      ruleOfThisElement.style[methodCss] = array[1]
    }
  }

  saveStyle(selector: any, css: any) {
    if( this.listenerStyle.find((item : any) =>  item.css === css).length){
      this.listenerStyle.push({selector  , css})
    }
  }

  pushEventToListense(func: any){
    this.instanceStyle.push(func)
  }

  static getElement(id: string) {
    return StoreElement.get(id)
  }
}

export default ElementContainer
