import { DragElementLayoutElement } from '@/app/types';
import React from 'react'

interface TextComponentProps {
  element: DragElementLayoutElement;
}

const TextComponents = ({ element }: TextComponentProps) => {
  return (
    <div className='w-full'>
        <p style={element.style}>{element.content}</p>
    </div>
  )
}

export default TextComponents;