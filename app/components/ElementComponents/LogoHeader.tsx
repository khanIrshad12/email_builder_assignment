import { DragElementLayoutElement } from '@/app/types';
import React from 'react'

interface LogoHeaderProps {
  element: DragElementLayoutElement;
}

const LogoHeader = ({ element }: LogoHeaderProps) => {
  return <img src={element.imageUrl} style={element.style} alt='header-logo' />;
}

export default LogoHeader;