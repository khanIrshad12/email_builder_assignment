'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DragElementLayoutElement, DragElementPayload, SelectedElementInterface, LayoutType } from '../types';
import { usePathname } from 'next/navigation';

interface HelperContextType {
  screenSize: string;
  dragElementLayout: DragElementLayoutElement | DragElementPayload | null;
  setDragElementLayout: React.Dispatch<React.SetStateAction<DragElementLayoutElement | DragElementPayload | null>>;
  setScreenSize: React.Dispatch<React.SetStateAction<string>>;
  emailTemplate: LayoutType[];
  setEmailTemplate: React.Dispatch<React.SetStateAction<LayoutType[]>>;
  selectedElement: SelectedElementInterface | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElementInterface | null>>;
  htmlCode: string;
  setHtmlCode: React.Dispatch<React.SetStateAction<string>>;
  htmlRef: React.RefObject<HTMLDivElement | null>;
  GetHtmlCode: () => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  getDraft: (templateId: string) => LayoutType[] | null;
}

const HelperContext = createContext<HelperContextType | undefined>(undefined);

export const HelperProvider = ({ children }: { children: React.ReactNode }) => {
  const DRAFT_PREFIX = 'draft_';
  const AUTOSAVE_DELAY = 3000; // 3 seconds

  const [screenSize, setScreenSize] = useState('desktop');
  const [dragElementLayout, setDragElementLayout] = useState<DragElementLayoutElement | DragElementPayload | null>(null);
  const [emailTemplate, setEmailTemplate] = useState<LayoutType[]>([]);
  const [selectedElement, setSelectedElement] = useState<SelectedElementInterface | null>(null);
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const htmlRef = React.useRef<HTMLDivElement>(null);
  const autoSaveTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const path = usePathname();
  const templateId = path?.split("/")[2];

  // Update selected element in email template
  useEffect(() => {
    if (selectedElement) {
      setEmailTemplate(prevTemplates =>
        prevTemplates.map(template =>
          'id' in template && template.id === selectedElement.layout.id
            ? selectedElement.layout
            : template
        )
      );
    }
  }, [selectedElement]);

  // Auto-save draft when changes are made
  useEffect(() => {
    if (typeof window !== 'undefined' && templateId && templateId !== 'undefined' && emailTemplate.length > 0) {
      setHasUnsavedChanges(true);
      
      // Clear existing timer
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }

      // Set new timer for auto-save
      autoSaveTimerRef.current = setTimeout(() => {
        try {
          localStorage.setItem(
            `${DRAFT_PREFIX}${templateId}`,
            JSON.stringify(emailTemplate)
          );
          setHasUnsavedChanges(false);
        } catch (error) {
          console.error('Error saving draft:', error);
        }
      }, AUTOSAVE_DELAY);
    }

    // Cleanup timer on unmount
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [emailTemplate, templateId]);

  // Handle beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const getDraft = (templateId: string): LayoutType[] | null => {
    if (typeof window !== 'undefined') {
      try {
        const draft = localStorage.getItem(`${DRAFT_PREFIX}${templateId}`);
        return draft ? JSON.parse(draft) : null;
      } catch (error) {
        console.error('Error getting draft:', error);
        return null;
      }
    }
    return null;
  };

  const GetHtmlCode = () => {
    const htmlContent = htmlRef.current?.innerHTML;
    setHtmlCode(htmlContent || '');
  };

  return (
    <HelperContext.Provider value={{
      screenSize,
      setScreenSize,
      dragElementLayout,
      setDragElementLayout,
      emailTemplate,
      setEmailTemplate,
      selectedElement,
      setSelectedElement,
      setHtmlCode,
      htmlCode,
      htmlRef,
      GetHtmlCode,
      hasUnsavedChanges,
      setHasUnsavedChanges,
      getDraft
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