'use client'
import Canvas from '@/app/components/Canvas'
import EditorHeader from '@/app/components/EditorHeader'
import ElementSideBar from '@/app/components/ElementSideBar'
import Setting from '@/app/components/Setting'
import { useHelperProvider } from '@/app/provider/HelperProvider'
import { LayoutType } from '@/app/types'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Editor = () => {
  const { 
   
    setEmailTemplate, 
    hasUnsavedChanges,
    getDraft 
  } = useHelperProvider();
  const [viewHTMLCode, setViewHTMLCode] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const path = usePathname()
  const convex = useConvex()
  const router = useRouter()
  const getIdparams = path?.split("/")[2];

  const fetchTemplate = async (tid: string) => {
    try {
      // First check for any unsaved draft
      const draftData = getDraft(tid);
      if (draftData) {
        setEmailTemplate(draftData);
        setIsDataLoading(false);
        return;
      }

      // If no draft, fetch from API
      const template = await convex.query(api.emailTemplate.GetTemplateByTid, { tid });
      
      if (template === null) {
        router.push("/");
      } else {
        if (template.design.length > 0) {
          const finalDataDesign = JSON.parse(template.design) as LayoutType[];
          setEmailTemplate(finalDataDesign);
        } else {
          setEmailTemplate([]);
        }
        setIsDataLoading(false);
      }
    } catch (error) {
      console.error('Error fetching template:', error);
      setEmailTemplate([]);
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (getIdparams && getIdparams !== "undefined") {
      fetchTemplate(getIdparams);
    } else {
      setIsDataLoading(false);
    }
  }, [getIdparams]);

  return (
    <div>
      {!isDataLoading ? (
        <>
          {hasUnsavedChanges && (
            <div className="bg-yellow-100 p-2 text-sm text-center">
              You have unsaved changes. Your work is being auto-saved.
            </div>
          )}
          <EditorHeader viewHTMLCode={(v: boolean) => setViewHTMLCode(v)} />
          <div className='grid grid-cols-5'>
            <ElementSideBar />
            <div className='col-span-3 bg-gray-200'>
              <Canvas viewHTMLCode={viewHTMLCode} closeDialog={() => setViewHTMLCode(false)} />
            </div>
            <Setting />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      )}
    </div>
  )
}

export default Editor