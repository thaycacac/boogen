function setBorderElement(
  width: number,
  height: number,
  left: number,
  top: number,
  element: HTMLElement,
) {
  if (element) {
    element.style.display = 'block'
    element.style.width = width + 'px'
    element.style.height = height + 'px'
    element.style.left = left + 'px'
    element.style.top = top + 'px'
  }
}

export default setBorderElement
