import CoreContainer from './CoreContainer'

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
    const { id } = this.state
    const CSSStyleDeclaration: CSSStyleDeclaration = this.getCSSStyleDeclaration(id)
    CSSStyleDeclaration.setProperty(key, value, '')
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
    const rule: any = arrInstanceStyle.find((rule: any) => rule.selectorText === `#boogen-${id}`)
    if (!rule) {
      instanceStyle.insertRule(`#boogen-${id}{}`, arrInstanceStyle.length)
      return instanceStyle.cssRules[arrInstanceStyle.length].style
    }
    return rule.style
  }

  /**
   * @description - Get all style to custom style
   */
  public getAllStyle(): string {
    const { id } = this.state
    const instanceStyle: any = document.styleSheets[2]
    const arrInstanceStyle: Array<object> = Array.from(instanceStyle.cssRules)
    const rule: any = arrInstanceStyle.find((rule: any) => rule.selectorText === `#boogen-${id}`)
    let allStyle: string = rule.cssText || ''
    if (!rule) {
      instanceStyle.insertRule(`#boogen-${id}{}`, arrInstanceStyle.length)
      allStyle = instanceStyle.cssRules[arrInstanceStyle.length].cssText
    }
    return allStyle.split(/ { | }/)[1] === '}' ? 'Empty' : allStyle.split(/ { | }/)[1]
  }

  /**
   * @description - User can custom css by write css
   * @param css - List css as object
   */
  public setCustomStyle(css: any) {
    const { id } = this.state
    const CSSStyleDeclaration: CSSStyleDeclaration = this.getCSSStyleDeclaration(id)
    CSSStyleDeclaration.cssText = css
  }
}

export default ElementContainer
