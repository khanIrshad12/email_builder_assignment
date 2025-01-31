import React from 'react'

const ColorPickerField = ({label,value,onHandlerStyle}:{label:string,value:string[],onHandlerStyle:(value:string)=>void}) => {
  return (
    <div className='flex gap-2 items-center pt-2'>
        <label>{label}</label>
        <input type="color" value={value} onChange={(e) => onHandlerStyle(e.target.value)} />
    </div>
  )
}

export default ColorPickerField