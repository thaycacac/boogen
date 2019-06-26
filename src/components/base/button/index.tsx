import styled from 'styled-components'
import variables from '../../../theme/variable'
import { getSize, sizeMedium } from './size'
import { getColor } from './color'

interface IBaseButton {
  href?: string,
  rel?: string,
  target?: string,
  active?: boolean,
  disable?: boolean,
  to?: any,
  size?: 'small' | 'medium' | 'large',
  event?: any,
  block?: boolean,
  variant?: 'primary' 
  | 'secondary' 
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark' 
  | 'link',
  type?: string
  rounded?: boolean,
  squared?: boolean,
  outline?: boolean,
  click?: (e: any) => any
}

const BaseButton = styled.button<IBaseButton>`
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  box-sizing: border-box;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  text-transform: none;
  overflow: visible;
  margin: 0;
  color: ${props => (props.outline) ? (
      (props.variant) ? getColor(props.variant) : variables.colors.primary
    ) : 'white'};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  background-color: ${props => (props.outline) ? 'white' : (
      (props.variant) ? getColor(props.variant) : variables.colors.primary
    )};
  border-color: ${props => (props.outline) ? (
      (props.variant) ? getColor(props.variant) : variables.colors.primary
    ) : 'white'};
  ${props => (props.size ? getSize(props.size): sizeMedium)}
`

export default BaseButton
