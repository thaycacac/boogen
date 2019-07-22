function convertDomToJson(node: any) {
  var obj = {
    nodeType: node.nodeType,
  } as any
  if (node.tagName) {
    obj.tagName = node.tagName.toLowerCase()
  } else if (node.nodeName) {
    obj.nodeName = node.nodeName
  }
  if (node.nodeValue) {
    obj.nodeValue = node.nodeValue
  }
  var attrs = node.attributes
  if (attrs) {
    var length = attrs.length
    var arr = (obj.attributes = new Array(length))
    for (var i = 0; i < length; i++) {
      let attr = attrs[i]
      arr[i] = [attr.nodeName, attr.nodeValue]
    }
  }
  var childNodes = node.childNodes
  if (childNodes) {
    length = childNodes.length
    arr = obj.childNodes = new Array(length)
    for (i = 0; i < length; i++) {
      arr[i] = convertDomToJson(childNodes[i])
    }
  }
  return obj
}

export default convertDomToJson
