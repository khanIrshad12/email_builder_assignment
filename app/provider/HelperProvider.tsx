"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DragElementLayoutElement, DragElementPayload, SelectedElementInterface } from '../types';


interface HelperContextType {
    screenSize: string;
    dragElementLayout: DragElementLayoutElement | DragElementPayload | null;
    setDragElementLayout: React.Dispatch<React.SetStateAction<DragElementLayoutElement | DragElementPayload | null>>;
    setScreenSize: React.Dispatch<React.SetStateAction<string>>;
    emailTemplate: Array<object>;
    setEmailTemplate: React.Dispatch<React.SetStateAction<Array<object>>>;
    selectedElement: SelectedElementInterface | null;
    setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElementInterface | null>>;
}

const HelperContext = createContext<HelperContextType | undefined>(undefined);

export const HelperProvider = ({ children }: { children: React.ReactNode }) => {

    const [screenSize, setScreenSize] = useState('desktop');
    const [dragElementLayout, setDragElementLayout] = useState<DragElementLayoutElement | DragElementPayload | null>(null);
    const [emailTemplate, setEmailTemplate] = useState<Array<object>>([]);
    const [selectedElement, setSelectedElement] = useState<SelectedElementInterface | null>(null);
  
    useEffect(() => {
        if (selectedElement) {
            setEmailTemplate(prevTemplates =>
                prevTemplates.map(template =>
                    // Ensure template is an object and has an 'id' property
                    typeof template === 'object' && 'id' in template &&
                        template.id === selectedElement.layout.id
                        ? selectedElement.layout // Update matching layout
                        : template // Preserve other layouts
                )
            );
        }
    }, [selectedElement]);


    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log("save to local storage emailtempate", emailTemplate);

            localStorage.setItem('emailTemplate', JSON.stringify(emailTemplate));
        }
    }, [emailTemplate]);



    return (

        <HelperContext.Provider value={{
            screenSize,
            setScreenSize,
            dragElementLayout,
            setDragElementLayout,
            emailTemplate,
            setEmailTemplate,
            selectedElement,
            setSelectedElement
        }}>

            {children}

        </HelperContext.Provider>
    );

};

export const useHelperProvider = () => {

    const context = useContext(HelperContext);

    if (!context) {

        throw new Error('useHelperProvider must be used within a HelperProvider');

    }
    return context;

};
