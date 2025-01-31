import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import React from 'react'

const ToggleAlignmentFileld = ({ label, value, options, onHandlerStyle }: { label: string, value: string[], options: { value: string, icon: React.ReactNode }[], onHandlerStyle: (v: string) => void }) => {
    return (
        <div>
            <label>{label}</label>
            <ToggleGroup type="single" defaultValue={value[0]} onValueChange={(v) => onHandlerStyle(v)}>
                {options.map((option, index) => (
                    <ToggleGroupItem key={index} value={option.value} className='w-full'>{option.icon}</ToggleGroupItem>

                ))}
            </ToggleGroup >
        </div>
    )
}

export default ToggleAlignmentFileld