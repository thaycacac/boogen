import CoreContainer from './CoreContainer'
import { camelCase } from 'lodash'

class ElementContainer extends CoreContainer {

  setState(state: any, callback: any) {
    return super.setState(state, callback)
  }

  /**
   * @description - Save style to element
   * @param  key - Key of style css
   * @param value - Value of style css
   */
  public setStyle(key: string, value: string) {
    const { id, styleContext } = this.state
    const CSSStyleDeclaration: CSSStyleDeclaration = this.getCSSStyleDeclaration(id)
    console.log(CSSStyleDeclaration);
    CSSStyleDeclaration.setProperty(key, value, "")
    CSSStyleDeclaration.setProperty('border-radius', '15px', "")
    console.log('ALL', styleContext);
  }

  /**
   * @description - Get value of style
   * @param  key - Key of style css
   */
  public getStyle(key: string): string {
    const CSSStyleDeclaration: CSSStyleDeclaration = this.getCSSStyleDeclaration(this.state.id)
    return CSSStyleDeclaration.getPropertyValue(key)
  }


  /**
   * @description - Get CSSStyleDeclaration of element
   * @param id - Id of container
   */
  private getCSSStyleDeclaration(id: string): CSSStyleDeclaration {
    const instanceStyle: any = document.styleSheets[2]
    const arrInstanceStyle: Array<object> = Array.from(instanceStyle.cssRules)
    const rule: any = arrInstanceStyle.find((rule : any) => rule.selectorText === `#boogen-${id}`)
    if(!rule){
      instanceStyle.insertRule(`#boogen-${id}{}`, arrInstanceStyle.length)
      return instanceStyle.cssRules[arrInstanceStyle.length].style
    }
    return rule.style
  }

  /**
   * @description - User can custom css by write css good-looking
   *   if exist index in list first delete css rule that index, then insert
   *   new css rule. Else then insert css rule in last. Finally check css rule
   *   created, if empty then delete it.
   * @param css - List css as object
   */
  public customStyle(css: any) {
    const { className, styleContext, id } = this.state
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
          this.checkLastRuleAndDelete(styleContext, id)
        }
      }
      console.log(styleContext)
      }
    );
  }

  /**
   * @description remove space, enter,...
   * @param text Text want to format
   */
  private formatText(text: string): string {
    return text.replace(/[\n\r\s\t]+/g, '')
  }

  /**
   * @description - Check css rule empty, if empty then delete that rule
   */
  private checkLastRuleAndDelete(styleContext: any, id: string) {
    if (styleContext.cssRules[styleContext.cssRules.length - 1].cssText === `#boogen-${id} { }`) {
      styleContext.deleteRule(styleContext.cssRules.length - 1)
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
      return indexLastRule
    })
    return existIndexRule !== indexLastRule && existIndexRule ? existIndexRule : indexLastRule
  }
}

export default ElementContainer
