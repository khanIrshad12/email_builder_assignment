'use client'
import React, { useEffect, useState } from 'react'
import { useHelperProvider } from '../provider/HelperProvider';
import ColumnLayout from './ColumnLayout';
import ViewHtmlDialog from './ViewHtmlDialog';
import { DragElementLayout, LayoutType } from '../types';


const Canvas = ({ viewHTMLCode, closeDialog }: { viewHTMLCode: boolean, closeDialog: () => void }) => {
  const { screenSize,
    dragElementLayout,
    emailTemplate,
    setEmailTemplate,
    htmlRef,
    htmlCode,
    GetHtmlCode
  } = useHelperProvider();

  const [dragOver, setDragOver] = useState<boolean>(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true)
    console.log("Over...")
  };

  const onDropHandle = () => {
    setDragOver(false)
    const layout = (dragElementLayout as unknown as DragElementLayout)?.dragLayout;
    console.log("layout", layout);
    if (layout) {
      setEmailTemplate(prev => [...prev, layout]);
    }
  };

  const getLayoutComoponent = (layout: LayoutType) => {
    console.log("layout", layout);

    if (layout?.type === "column") {
      return <ColumnLayout layout={layout} />;
    }

  }

  useEffect(() => {
    
    if (viewHTMLCode) {
      GetHtmlCode()
    }

  }, [viewHTMLCode])

  return (
    <div className='mt-20 flex justify-center '>
      <div className={`bg-white p-6 w-full ${screenSize == "desktop" ? "max-w-2xl" : "max-w-lg"}
      ${dragOver && "p-4 bg-purple-100"}
      `}
        onDragOver={onDragOver}
        onDrop={() => onDropHandle()}
        ref={htmlRef}
      >
        {emailTemplate.length > 0 ? emailTemplate?.map((item, id) => (
          <div key={id} className=''>
            {getLayoutComoponent(item as LayoutType)}
          </div>
        ))
          :
          <h2 className='p-4 text-center bg-gray-100 border border-dashed'>Add layout here</h2>
        }
      </div>
      <ViewHtmlDialog openDialog={viewHTMLCode} htmlCode={htmlCode} closeDialog={closeDialog} />
    </div>
  )
}

export default Canvas