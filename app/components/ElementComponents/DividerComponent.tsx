import { DragElementLayoutElement } from '@/app/types';
import React from 'react'

interface DividerComponentProps {
  element: DragElementLayoutElement;
}

const DividerComponent = ({ element }: DividerComponentProps) => {
  return <hr style={element.style} />;
}

export default DividerComponent;