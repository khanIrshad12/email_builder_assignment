import { DragElementLayoutElement } from '@/app/types';
import React from 'react'

interface ImageComponentProps {
  element: DragElementLayoutElement;
}

const ImageComponents = ({ element }: ImageComponentProps) => {
  return (
    <div style={element.outerStyle}>
        <img src={element.imageUrl} style={element.style} alt='image' />
    </div>
  )
}

export default ImageComponents;