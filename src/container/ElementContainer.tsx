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
  public setStyle(key: string, value: string): void {
    const { id, styleContext } = this.state

    const indexExistRule = this.getIndexExistRule(key)
    if (indexExistRule) {
      styleContext.insertRule(`#boogen-${id}{${key}: ${value}}`,styleContext.cssRules.length)
      this.checkLastRuleAndDelete(styleContext, id)
      styleContext.deleteRule(indexExistRule)
    } else {
      styleContext.insertRule(`#boogen-${id}{${key}: ${value}}`, styleContext.cssRules.length)
      this.checkLastRuleAndDelete(styleContext, id)
    }
  }

  /**
   * @description - Get value of style
   * @param  key - Key of style css
   * @param value - Value of style css
   */
  public getStyle(key: string): string {
    let value = ''
    const { styleContext } = this.state
    const cssRules = styleContext.cssRules
    Object.keys(cssRules).find(keyIndex => {
      // ["#boogen-abcde, " background-color", " red", " }"]
      const splitRule = cssRules[keyIndex].cssText.split(/:|{|;/)
      if (this.formatText(splitRule[1]) === key) {
        value = this.formatText(splitRule[2])
      }
      return splitRule[1] === key
    })
    return value
  }

  /**
   * @description - Return index of rule if it exist or return 0
   * @param key - Key of css
   */
  private getIndexExistRule(key: string): any {
    const { styleContext } = this.state
    const cssRules = styleContext.cssRules
    const index = Object.keys(cssRules).find(keyIndex => {
      // ["#boogen-abcde, " background-color", " red", " }"]
      const splitRule = cssRules[keyIndex].cssText.split(/:|{|;/)
      return this.formatText(splitRule[1]) === key
    })
    return index
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
