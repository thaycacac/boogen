class Interation {
    dropTarget = null
    position: String = ''
    reset() {
       setTimeout(() => {
        this.dropTarget = null
        this.position = ''
       },100)
    }
}
export default new Interation()