import StoreElement from './StoreElement'
import CoreContainer from './CoreContainer'
import StyleContainer from './StyleContainer'
import { camelCase } from 'lodash'

class ElementContainer extends CoreContainer {

  private instanceStyle: any = null
  private styles = new StyleContainer()
  private listenerStyle = [] as any[]

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }

  /**
   * @param  css - List css in a object
   * @example {
   *   background: red;
   *   color: blue
   * }
   */
  public setStyle(css: Object): void {
    const styles: any = this.getStyle()
    for(let [property, value] of Object.entries(css)) {
      styles.style[property] = value
    }
  }

  /**
   * @description Find rules of element have class name denerate,
   * if found this rule then return, elese then insert rule with data empty
   */
  private getStyle() {
    const { className } = this.state
    // have 3 styleSheet, and styleSheet of Editor space is 1(check by console.log)
    const instanceStyleOfEditor: any = document.styleSheets[1]
    const arrayInstanceStyle = Array.from(instanceStyleOfEditor.cssRules)
    const ruleOfThisElement = arrayInstanceStyle.find(
      (rule: any) => rule.selectorText === `.${className}`
    )
    if (!ruleOfThisElement) {
      instanceStyleOfEditor.insertRule(`.${className}{}`, arrayInstanceStyle.length)
      return  instanceStyleOfEditor.cssRules[arrayInstanceStyle.length]
    }
    return ruleOfThisElement
  }

  // TODO: read more
  private getSelector(): string {
    return this.state.componentStyle.lastClassName
  }

  public checkExistRule(styleContext: any): boolean {
    const check = Array.from(
      styleContext.cssRules
    ).find(
      (rule: any) => rule.selectorText.includes(this.getSelector()))
    if (check) {
      return true
    }
    return false
  }

  /**
   * @description 
   * @param css list css as object
   */
  // TODO: continue custom style
  public customStyle(css: any) {
    const { className, styleContext } = this.state
    const listCss = Array.from(css.split(';'))
    listCss.forEach((css: any) => {
      if(css) {
        const [property, value] = css.split(':')
        console.log(property.replace(/[\n\r\s\t]+/g, ' '))
        console.log(value.replace(/[\n\r\s\t]+/g, ' '))
      }
      // const [key: value] = css
    });
    // if (!this.checkExistRule(styleContext)) {
    //   styleContext.insertRule(`.${className}{${css}}`, styleContext.length)
    // } else {
    //   const arrayInstanceStyle = Array.from(styleContext.cssRules)
    //   const ruleOfThisElement: any = arrayInstanceStyle.find(
    //     (rule: any) => rule.selectorText.includes(this.getSelector())
    //   )
    //   const cssCamelCase = camelCase(css)
    //   const array = cssCamelCase.split(':')
    //   const methodCss = camelCase(array[0])
    //   ruleOfThisElement.style[methodCss] = array[1]
    // }
  }

  saveStyle(selector: any, css: any) {
    if( this.listenerStyle.find((item : any) =>  item.css === css).length){
      this.listenerStyle.push({selector  , css})
    }
  }
}

export default ElementContainer
