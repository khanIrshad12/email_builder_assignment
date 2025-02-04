import { DragElementLayoutElement } from '@/app/types';
import React from 'react'

interface LogoComponentProps {
  element: DragElementLayoutElement;
}

const LogoComponent = ({ element }: LogoComponentProps) => {

  return (
    <div style={element.outerStyle}>
      <img src={element.imageUrl} style={element.style} alt='logo' />
    </div>
  )
}

export default LogoComponent;