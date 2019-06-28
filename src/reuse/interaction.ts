class Interation {
  dropTarget: any = null
  position: string = ''
  category: string = ''
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
