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

    const indexLastRule = styleContext.cssRules.length
    const existIndexRule = this.existIndexRule(key, styleContext)

    if (existIndexRule !== indexLastRule) {
      styleContext.insertRule(`#boogen-${id}{${key}: ${value}}`,styleContext.cssRules.length)
      styleContext.deleteRule(existIndexRule)
    } else {
      styleContext.insertRule(`#boogen-${id}{${key}: ${value}}`, styleContext.cssRules.length)
    }
    console.log(styleContext);
  }

  /**
   * @description - Get value of style
   * @param  key - Key of style css
   * @param value - Value of style css
   */
  private getStyle(key: string) {
    const { styleContext } = this.state
    console.log(styleContext)
    // const styleOfRule = styleContext.cssRules[keyIndex].style
    // return styleOfRule[camelCase(key)]
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
   * @description remove space, enter,...
   * @param text Text want to format
   */
  private formatText(text: string): string {
    return text.replace(/[\n\r\s\t]+/g, '')
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
      return indexLastRule
    })
    return existIndexRule !== indexLastRule && existIndexRule ? existIndexRule : indexLastRule
  }
}

export default ElementContainer
