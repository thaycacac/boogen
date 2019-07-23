function convertJsonToDom(dom: any) {
  let node = null
  const nodeType = dom.nodeType

  switch (nodeType) {
    case 1: //ELEMENT_NODE
      const childNodes = dom.childNodes
      const len = childNodes.length
      node = document.createElement('ul')
      if (len !== 0) {
        node.classList.add('nested')
      }
      const text = document.createTextNode(dom.tagName)
      node.appendChild(text)

      for (let i = 0; i < len; i++) {
        // @ts-ignore
        if (childNodes[i]) node.appendChild(convertJsonToDom(childNodes[i]))
      }
      break
    case 3: //TEXT_NODE
      node = document.createTextNode('')
      break
  }
  return node
}

export default convertJsonToDom
