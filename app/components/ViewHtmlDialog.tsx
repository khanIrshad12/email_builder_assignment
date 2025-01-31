import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Copy } from 'lucide-react'
const ViewHtmlDialog = ({ openDialog, htmlCode, closeDialog }: { openDialog: boolean, htmlCode: string, closeDialog: () => void }) => {
    const CopyCode = () => {
        navigator.clipboard.writeText(htmlCode)
    }
    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent className='bg-gray-200'>
                <DialogHeader>
                    <DialogTitle asChild>
                        <div className='flex items-center justify-between'>
                            <h2>HTML Email Template</h2>
                            <Copy className="p-2 bg-grap-200 rounded-full h-9 w-9 cursor-pointer" onClick={CopyCode} />
                        </div>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className='word-break break-all max-h-[400px] overflow-auto bg-gray-200 rounded-md p-5 cursor-pointer' >

                            {htmlCode}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ViewHtmlDialog