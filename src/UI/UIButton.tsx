import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface IUIButton {
    width ?: any
    height ?:any
    children?: any
    onmousedown?: (e: any) => any,
    style?: any,
    disable?: boolean,
    keyButton?: number,
    icon?: string,
    to?: string,
    size?: 'large' | 'medium' | 'small'
    type?: 'primary' 
      | 'secondary' 
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'light'
      | 'dark' 
      | 'link'
    mode?: 'normal' | 'outline'
}

function UIButton({
  width,
  height,
  children,
  onmousedown,
  style,
  disable,
  keyButton,
  icon,
  to,
  size,
  type,
  mode
}: IUIButton) {

}
