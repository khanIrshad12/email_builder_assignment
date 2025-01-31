import { Input } from '@/components/ui/input'
import React from 'react'

const InputStyleFontField = ({label,value,onHandlerStyle}:{label:string,value:string[],onHandlerStyle:(v:string)=>void}) => {
    const FormattedValue=(value:string) => {
        return value.replace("px","")
    }

    return (
    <div>
        <label>{label}</label>
        <Input type="text" value={FormattedValue(value.join(' '))} onChange={(e:React.ChangeEvent<HTMLInputElement>) => onHandlerStyle(e.target.value)} />
    </div>
  )
}

export default InputStyleFontField