'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

const InputFields = ({ label, values, onInputHandler }: { 
  label: string, 
  values: string[], 
  onInputHandler: (value: string[]) => void 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPos, setCursorPos] = useState<number | null>(null);
console.log("value",values);

  useEffect(() => {
    if (inputRef.current && cursorPos !== null) {
      inputRef.current.setSelectionRange(cursorPos, cursorPos);
    }
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("value",value);
    
    const cursor = e.target.selectionStart;
    setCursorPos(cursor);
    onInputHandler([value]);
  };

  return (
    <>
      <label>{label}</label>
      <Input 
        ref={inputRef}
        type='text' 
        value={values[0] || ''} 
        onChange={handleChange}
      />
    </>
  );
};

export default InputFields;