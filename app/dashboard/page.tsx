'use client';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Workspace from '../components/Workspace';
import EditorHeader from '../components/EditorHeader';
import { v4 as uuidv4 } from 'uuid';

const Page = () => {
  const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);
  const { data: session, status } = useSession();
  const EmailId: string = session?.user?.email || ''
  const router = useRouter();
  const CreateUser = useMutation(api.users.CreateUser);
  const [userSaved, setUserSaved] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }
    // Ensure that the emailTemplate property exists on the api object

    const SaveUserData = async () => {
      try {

        const user = session?.user;

        if (user && !userSaved) {

          await CreateUser({
            name: user.name || "",
            email: user.email || "",
            picture: user.image || ""
          });

          setUserSaved(true);
        }
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    };

    if (status === 'authenticated') {
      SaveUserData();
    }
  }, [status, session, userSaved, CreateUser, router]);



  const handleCreateTemplate = async () => {
    if (!EmailId) return;
    const tid = uuidv4(); // Generate unique ID

    try {
      await SaveTemplate({
        tid,
        design: [],
        email: EmailId,
      });

      router.push(`/editor/${tid}`); // Redirect to editor with the new ID
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  if (status === 'loading') {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  }

  return <>
    <EditorHeader viewHTMLCode={() => { }} />
    <div className='max-w-[920px] mx-auto py-8'>
      <div className='flex justify-between items-center'>
        <div className='text-4xl ' >Welcome <span className='font-bold text-purple-500'>{session?.user?.name}!</span></div>
        <Button className='text-md bg-purple-500 hover:bg-purple-600 text-white' onClick={handleCreateTemplate}>Create Email Template</Button>
      </div>
      <Workspace EmailId={EmailId} handleCreateTemplate={handleCreateTemplate} />
    </div>
  </>
};

export default Page;