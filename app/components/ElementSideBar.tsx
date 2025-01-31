'use client'
import React from 'react'
import layout from '../utils/layout'
import ElementLayoutCard from './sidebarContent/ElementLayoutCard'
import ElementList from '../utils/ElementList'
import { useHelperProvider } from '../provider/HelperProvider'
import { LayoutType } from '../types'

type ElementData = {
  icon: React.ComponentType;
  label: string;
  type: string;
  style: React.CSSProperties;
  outerStyle?: React.CSSProperties;
} & (
    | {
      type: "Button";
      content: string;
      url: string;
    }
    | {
      type: "Text";
      content: string;
    }
    | {
      type: "Image" | "Logo" | "LogoHeader";
      imageUrl: string;
      alt: string;
    }
    | {
      type: "Divider";
    }
    | {
      type: "Social Media";
    }
  );

const ElementSideBar = () => {
  const { setDragElementLayout } = useHelperProvider();
  const onDragLayoutStart = (layout: LayoutType) => {
    setDragElementLayout({
      dragLayout: {
        ...layout,
        id: Date.now()
      },
      icon: layout.icon,
      label: layout.label,
      type: layout.type,
      content: '',
      url: '',
      style: {},
      imageUrl: '',
      outerStyle: { display: '', justifyContent: '', alignItems: '' }
    })
  }

  const onDragElementStart = (element: ElementData) => {
    console.log("elemnet", element)

    setDragElementLayout({
      dragElement: {
        ...element,
        id: Date.now()
      },
      icon: element?.icon,
      label: element.label,
      type: element.type,
      content: 'content' in element ? element.content : '',
      url: 'url' in element ? element.url : '',
      style: element.style,
      imageUrl: 'imageUrl' in element ? element.imageUrl : '',
      outerStyle: {
        display: element.outerStyle?.display || '',
        justifyContent: element.outerStyle?.justifyContent || '',
        alignItems: element.outerStyle?.alignItems || ''
      }
    })
  }

  return (
    <div className='p-5'>
      <h2 className='font-bold text-lg'>Layout</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {
          layout.map((item, id: number) => (
            <div key={id} draggable onDragStart={() => onDragLayoutStart(item)}>

              <ElementLayoutCard key={id} item={item} />

            </div>))
        }
      </div>

      <h2 className='font-bold text-lg'>Elements</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {

          ElementList.map((element, index) => (
            <div className='cursor-pointer' key={index} draggable onDragStart={() => onDragElementStart(element as ElementData)}>

              <ElementLayoutCard key={index} item={element} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ElementSideBar