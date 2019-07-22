import React, { Component } from 'react'
import styled from 'styled-components'
import { convertDomToJson, convertJsonToDom } from '../../utils'

class SourceTreeSpace extends Component<any> {
  constructor(state: any) {
    super(state)
    this.state = {
      isRender: false,
    }
  }
  dom: any = {}
  componentDidMount = () => {
    const page = document.getElementById('editor-space')
    this.dom = convertDomToJson(page)
    console.log(this.dom)
  }

  componentDidUpdate = () => {
    const page = document.getElementById('editor-space')
    this.dom = convertDomToJson(page)
    const abcde = document.getElementById('abcde')
    const node = convertJsonToDom(this.dom)
    // @ts-ignore
    if (abcde) abcde.appendChild(node)
    console.log(this.dom)
  }

  render() {
    return (
      <div>
        <p id="abcde">acde</p>
        <button onClick={() => this.setState({ isRender: true })}>abcde</button>
      </div>
    )
  }
}

const WrapAll = styled.div`
  height: 400px;
`

export default SourceTreeSpace
