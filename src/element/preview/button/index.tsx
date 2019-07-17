import styled from 'styled-components'
import variables from '../../../theme/variable'
import { getSize, sizeMedium } from './size'
import { getColor, getColorEffect } from './color'

interface IButton {
  disable?: boolean
  size?: 'small' | 'medium' | 'large'
  block?: boolean
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
  type?: string
  rounded?: boolean
  outline?: boolean
  click?: (e: any) => any
}

const Button = styled.button<IButton>`
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
  display: inline-block;
  box-sizing: border-box;
  text-transform: none;
  overflow: visible;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: ${props =>
    props.outline ? (props.variant ? getColor(props.variant) : variables.colors.primary) : 'white'};
  background-color: ${props =>
    props.outline ? 'white' : props.variant ? getColor(props.variant) : variables.colors.primary};
  border-color: ${props =>
    props.outline ? (props.variant ? getColor(props.variant) : variables.colors.primary) : 'white'};
  border-radius: ${props => (props.rounded ? '50rem!important' : '')};
  ${props => (props.size ? getSize(props.size) : sizeMedium)};

  &:hover {
    color: ${props =>
      props.outline
        ? props.variant
          ? getColorEffect(props.variant)
          : variables.colors.primary
        : 'white'};
    background-color: ${props =>
      props.outline
        ? 'white'
        : props.variant
        ? getColorEffect(props.variant)
        : variables.colors.primary};
  }
`

export default Button
