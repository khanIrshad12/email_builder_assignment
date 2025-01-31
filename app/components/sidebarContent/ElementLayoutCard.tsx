import React from 'react'

interface Item {
  icon: React.ElementType;
  label: string;
}

const ElementLayoutCard = ({item}:{item:Item}) => {
  return (
     <div  className='flex flex-col items-center justify-between border border-dashed rounded-xl p-3 group hover:shadow-md hover:border-purple-500 cursor-pointer'>
    {<item.icon className='group-hover:bg-purple-100 p-1 bg-gray-100 rounded-full group-hover:text-purple-500' />}
    <h2 className='text-sm group-hover:text-purple-500 text-center'>{item.label}</h2>
  </div>
  )
}

export default ElementLayoutCard