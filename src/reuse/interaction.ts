type TypePosition = 'TOP'|'BOTTOM'|'LEFT'|'RIGHT'|'INSIDE'|''
type TypeCategory = 'DRAG'|'MOVE'
class Interation {
  dropTarget: any = null
  position: TypePosition = ''
  category: TypeCategory = 'DRAG'
  doing: boolean = false
  reset(): void {
    setTimeout(() => {
      this.dropTarget = null
      this.position = ''
      this.doing = false
    },100)
  }
}
export default new Interation()
