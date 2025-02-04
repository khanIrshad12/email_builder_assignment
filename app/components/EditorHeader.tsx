'use client'
import { Button } from '@/components/ui/button'
import { Code, Monitor, Smartphone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useHelperProvider } from '../provider/HelperProvider'
import { usePathname } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useToast } from '@/hooks/use-toast'

const EditorHeader = ({ viewHTMLCode }: { viewHTMLCode: (v: boolean) => void }) => {
    const [isSending, setIsSending] = React.useState(false);
    const { screenSize, setScreenSize, emailTemplate, htmlRef } = useHelperProvider();
    const path = usePathname();
    const { toast } = useToast()

    const updateTemplate = useMutation(api.emailTemplate.UpdateTemplate);
    const handleSave = async () => {
        const design = JSON.stringify(emailTemplate);

        await updateTemplate({
            tid: path.split("/")[2],
            design
        })
        toast({
            title: "Email Template Saved Successfully",

        })
        console.log("click save");

    }
    const handleSendEmail = async () => {
        const htmlContent = htmlRef.current?.innerHTML
        console.log("htmlContent", htmlContent);
        try {
            setIsSending(true);
            const response = await fetch('/api/emailsend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: 'Your Email Template',
                    htmlContent
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to send email');

            toast({
                title: "Email sent successfully",
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to send email";
            toast({
                title: errorMessage,
                variant: "destructive"
            });
        } finally {
            setIsSending(false);
        }
    }

    return (
        <nav className="w-full py-6 px-4 flex justify-between items-center bg-white shadow-md">
            <Link href="/" className="text-2xl font-bold">
                EmailBuilder
            </Link>

            {(path !== "/dashboard" && path !== "/") &&
                <>
                    <div className='space-x-2'>
                        <Button variant={'ghost'} className={`${screenSize === 'desktop' && 'bg-purple-100 text-purple-500'} `} onClick={() => setScreenSize('desktop')} ><Monitor /> Desktop</Button>
                        <Button variant={'ghost'} className={`${screenSize === 'mobile' && 'bg-purple-100 text-purple-500'} `} onClick={() => setScreenSize('mobile')}><Smartphone /> Mobile</Button>
                    </div>

                    <div className="flex space-x-4">
                        <Button variant="ghost" className='hover:text-purple-500' onClick={() => viewHTMLCode(true)}>
                            <Code />
                        </Button>

                        <Button className='' variant='outline' onClick={handleSendEmail}>{isSending ? "Sending..." : "Send Test Email"}</Button>
                        <Button className='bg-purple-500' onClick={handleSave}>Save Template</Button>

                    </div>
                </>
            }



        </nav >
    )
}

export default EditorHeader