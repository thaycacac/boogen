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
   * @description Find rules of element have class name generate,
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

  /**
   * @description - User can custom css by write css good-looking
   *   if exist index in list first delete css rule that index, then insert
   *   new css rule. Else then insert css rule in last. Finally check css rule
   *   created, if empty then delete it.
   * @param css - List css as object
   */
  public customStyle(css: any) {
    const { className, styleContext } = this.state
    const listCss = Array.from(css.split('\n'))
    listCss.forEach((css: any) => {
      if(css) {
        const indexLastRule = styleContext.cssRules.length
        const existIndexRule = this.existIndexRule(this.formatText(css.split(':')[0]), styleContext)
        if (existIndexRule !== indexLastRule) {
          styleContext.deleteRule(existIndexRule)
          styleContext.insertRule(`.${className}{${css}}`, indexLastRule - 1)
          // this.checkCssRuleAndDelete(styleContext, 0, className)
        } else {
          styleContext.insertRule(`.${className}{${css}}`, indexLastRule)
          this.checkCssRuleAndDelete(styleContext, indexLastRule, className)
        }
      }
      console.log(styleContext)
      }
    );
  }

  /**
   * @description - Check css rule empty, if empty then delete that rule
   */
  private checkCssRuleAndDelete(styleContext: any, index: number, className: string) {
    if (styleContext.cssRules[index].cssText === `.${className} { }`) {
      styleContext.deleteRule(index)
    }
  }

  /**
   * @description - Check css rule exist in list or not if exist return
   *    index of attribute, else then return last index inrule
   * @param key - Key of property css (example: background-image)
   * @param styleContext - StyleContext of this element
   */
  private existIndexRule(key: string, styleContext: any) {
    const cssRules = styleContext.cssRules
    const indexLastRule = cssRules.length
    const existIndexRule = Object.keys(cssRules).find(keyIndex => {
      const styleOfRule = cssRules[keyIndex].style
      if(styleOfRule && styleOfRule[camelCase(key)] !== '') {
        return keyIndex
      }
    })
    return existIndexRule !== indexLastRule && existIndexRule ? existIndexRule : indexLastRule
  }

  /**
   * @description remove space, enter,...
   * @param text Text want to format
   */
  private formatText(text: string): string {
    return text.replace(/[\n\r\s\t]+/g, '')
  }

  public subcribeStyle(func: any) {
    this.listenerStyle.push(func)
  }

  public unSubcribeStyle(func: any) {
    this.listenerStyle = this.listenerStyle.filter(item => item !== func)
  }

  // TODO: not complete
  saveStyle(selector: any, css: any) {
    if( this.listenerStyle.find((item : any) =>  item.css === css).length){
      this.listenerStyle.push({selector  , css})
    }
  }
}

export default ElementContainer
