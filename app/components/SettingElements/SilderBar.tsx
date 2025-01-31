import { Slider } from '@/components/ui/slider'
import React from 'react'

const SilderBar = ({ label, values, type, onHandlerStyle }: { label: string, type: string, values: string[], onHandlerStyle: (value: string[]) => void }) => {
    console.log("value", values);
    const FormattedValue = (value_: string) => {
        return value_.toString().replace(type, "")
    }
    return (
        <div className='flex items-center gap-2'>
            <label>{label}</label>
            <Slider
               
                color='red'
                min={0}
                className='text-purple-500'
                defaultValue={[Number(FormattedValue(values[0]))]} max={100} step={.5}
                onValueChange={(v) => {
                    onHandlerStyle([v + type])
                    return
                }}
            />
        </div>
    )
}

export default SilderBar