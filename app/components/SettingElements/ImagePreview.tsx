import { Input } from '@/components/ui/input'
import React from 'react'

const ImagePreview = ({ label, value, onInputHandler }: { label: string, value: string[], onInputHandler: (v:string)=>void }) => {
    return (
        <div>
            <label>{label}</label>
            <img src={value[0]} alt="image" className='w-full h-[150px] object-cover border border-gray-300
             rounded-xl' />
             <Input type="text" value={value[0]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputHandler(e.target.value)} />
        </div>
    )
}

export default ImagePreview