import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface IUIButton {
    width ?: any
    height ?:any
    children?: any
}
export default function UIButton({ 
  children,
  width,
  height
}: IUIButton) {
    return <button>
      {children}
    </button>
}