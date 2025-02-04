'use client'
import React, { useState } from 'react'
import { useHelperProvider } from '../provider/HelperProvider';
import ButtonComponent from './ElementComponents/ButtonComponent';
import TeaxtComponents from './ElementComponents/TeaxtComponents';
import ImageComponents from './ElementComponents/ImageComponents';
import LogoComponent from './ElementComponents/LogoComponent';
import LogoHeader from './ElementComponents/LogoHeader';
import DividerComponent from './ElementComponents/DividerComponent';
import { DragElementLayout, DragElementLayoutElement, LayoutType } from '../types';
import { Trash } from 'lucide-react';

const ColumnLayout = ({ layout }: { layout: LayoutType }) => {
    const [dragOver, setDragOver] = useState<{ index?: number; columnId?: number } | null>({});
    const { emailTemplate, setEmailTemplate, dragElementLayout, selectedElement, setSelectedElement } = useHelperProvider() as { emailTemplate: LayoutType[], setEmailTemplate: React.Dispatch<React.SetStateAction<LayoutType[]>>, dragElementLayout: DragElementLayout, selectedElement: { layout: LayoutType, index: number } | null, setSelectedElement: React.Dispatch<React.SetStateAction<{ layout: LayoutType, index: number } | null>> };

    const onDragOverHandle = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setDragOver({
            index,
            columnId: layout?.id
        })
    }

    /*  */
    const onDropHandle = () => {
        const index = dragOver?.index;
        if (index !== undefined) {
            setEmailTemplate((prevColumns: LayoutType[]) => prevColumns.map((col) => {
                
                if (col.id === layout?.id) {
                    const newElements = [...(col.elements || [])];
                    if (dragElementLayout?.dragElement) {
                        newElements[index] = dragElementLayout.dragElement;
                    }
                    
                    return { ...col, elements: newElements };
                }
                return col;
            }));
        }

        setDragOver(null);
    }

    const GetElementComponent = (element: DragElementLayoutElement) => {
        
        if (element?.type == "Button") {
            return <ButtonComponent element={element} />
        } else if (element?.type == "Text") {
            return <TeaxtComponents element={element} />
        } else if (element?.type == "Image") {
            return <ImageComponents element={element} />
        } else if (element?.type == "Logo") {
            return <LogoComponent element={element} />
        } else if (element?.type == "Divider") {
            return <DividerComponent element={element} />
        } else if (element?.type == "LogoHeader") {
            return <LogoHeader element={element} />
        }
        return element?.type
    }

    const deleteLayout = (layoutId: number) => {
        const updateEmailTemplate = emailTemplate.filter((item:LayoutType) => item.id !== layoutId)
        setEmailTemplate(updateEmailTemplate)
        setSelectedElement(null)
    }

    return (
        <div className='relative'>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${layout.numOfCol}, 1fr)`,
                    gap: '0px'
                }}
                className={` ${selectedElement?.layout?.id === layout?.id && "border border-dashed border-blue-400 "}`}
            >
                {
                    Array.from({ length: layout.numOfCol }).map((_, index) => (
                        <div key={index}
                            className={`p-2 flex items-center justify-center cursor-pointer ${!layout?.[index]?.type && "border bg-gray-100 border-dashed"} 
                        ${(index === dragOver?.index && dragOver?.columnId) && "bg-green-100"}
                       ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index && "border-2 border-blue-400 "}
                        `}
                            onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOverHandle(e, index)}
                            onDrop={onDropHandle}
                            onClick={() => setSelectedElement({
                                layout: layout, index: index

                            })}
                        >
                            {GetElementComponent(layout?.elements?.[index] as DragElementLayoutElement) ?? "Drag Element Here"}
                        </div>
                    ))
                }
                {
                    selectedElement?.layout?.id === layout?.id && (
                        <div className='absolute right-0 bg-gray-100 p-1 rounded-full ' onClick={() => layout?.id !== undefined && deleteLayout(layout.id)}>
                            <Trash className='w-3 h-3 cursor-pointer hover:text-red-500' />

                        </div>

                    )
                }
            </div>
        </div >
    )
}

export default ColumnLayout