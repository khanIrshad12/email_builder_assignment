// ButtonComponent.tsx
import React from 'react';
import { DragElementLayoutElement } from '@/app/types';

interface ButtonComponentProps {
  element: DragElementLayoutElement;
}

const ButtonComponent = ({ element }: ButtonComponentProps) => {
  const { style, content, url } = element;
  
  return (
    <div className='text-center' style={{ width: style?.width }}>
      <a href={url}>
        <button style={style}>{content}</button>
      </a>
    </div>
  )
}

export default ButtonComponent;