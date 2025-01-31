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
import React, { useState } from 'react'

const Editor = () => {
  const { emailTemplate, setEmailTemplate } = useHelperProvider();
  const [viewHTMLCode, setViewHTMLCode] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const path = usePathname()
  const convex = useConvex()
  const router = useRouter()
  const getIdparams = path?.split("/")[2];

  const fetchTemplate = async (tid: string) => {
    const template = await convex.query(api.emailTemplate.GetTemplateByTid, { tid });
    if (template === null) {
      router.push("/");
    } else {
      console.log("template", template);
      if (template.design.length > 0) {
        const finalDataDesign = JSON.parse(template.design) as LayoutType[];

        setEmailTemplate(finalDataDesign);
        setIsDataLoading(false);

      } else {
        setEmailTemplate([]);
        setIsDataLoading(false);
      }
    }
  };

  console.log("emailTemplate", emailTemplate);

  React.useEffect(() => {
    console.log("getIdparams", getIdparams);

    if (getIdparams !== "undefined") {
      fetchTemplate(getIdparams);
    }
  }, []);

  return (
    <div>
      {
        !isDataLoading ?
          <>
            <EditorHeader viewHTMLCode={(v: boolean) => setViewHTMLCode(v)} />
            <div className='grid grid-cols-5'>
              <ElementSideBar />
              <div className='col-span-3 bg-gray-200'>
                <Canvas viewHTMLCode={viewHTMLCode} closeDialog={() => setViewHTMLCode(false)} />
              </div>
              <Setting />
            </div>
          </> : "Loadding..."
      }

    </div>
  )
}

export default Editor