'use client'
import React, { useEffect, useState } from 'react'
import { useHelperProvider } from '../provider/HelperProvider'
import InputFields from './SettingElements/InputFields';
import ColorPickerField from './SettingElements/ColorPickerField';
import SilderBar from './SettingElements/SilderBar';
import ToggleAlignmentFileld from './SettingElements/ToggleAlignmentFileld';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import ImagePreview from './SettingElements/ImagePreview';
import { SelectedElementInterface } from '../types';


const Setting = () => {
  const { selectedElement, setSelectedElement } = useHelperProvider();
  const [element, setElement] = useState<{ content?: string, type?: string, style?: { backgroundColor?: string, color?: string, fontSize?: string, padding?: string, fontWeight?: string, width?: string, borderRadius?: string, textAlign?: string }, outerStyle?: { backgroundColor?: string, justifyContent?: string }, url?: string, imageUrl?: string } | null>(null)

  const options = [
    {
      icon: <AlignLeft />,
      value: "left",
    },
    {
      icon: <AlignCenter />,
      value: "center",
    },
    {
      icon: <AlignRight />,
      value: "right",
    },
  ]
  console.log("seleted", element);
  useEffect(() => {

    const selectedElementData = selectedElement?.layout?.elements?.[selectedElement?.index];
    if (selectedElementData) {
      setElement({
        ...selectedElementData,
        style: {
          ...selectedElementData.style,
          fontSize: selectedElementData.style?.fontSize?.toString(),
          padding: selectedElementData.style?.padding?.toString(),
          fontWeight: selectedElementData.style?.fontWeight?.toString(),
          width: selectedElementData.style?.width?.toString(),
          borderRadius: selectedElementData.style?.borderRadius?.toString(),
          textAlign: selectedElementData.style?.textAlign?.toString(),
        },
      });
    } else {
      setElement(null);
    }
  }, [selectedElement]);

  console.log("selectedElement", selectedElement);
  const onInputHandler = (fieldName: string, value: string[]) => {
    //copy the current selectedelement
    console.log("filename", fieldName, value);
    console.log();

    if (!selectedElement) return;
    const updatedData: SelectedElementInterface = { ...selectedElement };
    console.log("updatedData", updatedData);

    //update the specific field
    if (selectedElement.index !== undefined) {
      if (updatedData.layout.elements) {

        console.log(updatedData.layout);
        //@ts-expect-error - Skipping type check for this specific line
        (updatedData.layout.elements[selectedElement.index])[fieldName] = value;
      }
    }

    setSelectedElement(updatedData as SelectedElementInterface);
    //update original selectedElement
  }

  const onHandlerStyle = (fieldName: string, value: string[]) => {
    if (!selectedElement || selectedElement.index === undefined) return;

    // Copy the current selected element
    const updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        elements: selectedElement.layout?.elements?.map((element, index) =>
          index === selectedElement.index
            ? {
              ...element,
              style: {
                ...element.style,
                [fieldName]: value
              }
            }
            : element
        )
      }
    };

    setSelectedElement(updatedData as SelectedElementInterface);
  }
  const onHandlerOuterStyle = (fieldName: string, value: string) => {

    if (!selectedElement || selectedElement.index === undefined) return;

    console.log("handle outer style", value, fieldName);

    // Copy the current selected element
    const updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        elements: selectedElement.layout?.elements?.map((element, index) =>
          index === selectedElement.index
            ? {
              ...element,
              outerStyle: {
                ...element.outerStyle,
                [fieldName]: value
              }
            }
            : element
        )
      }
    };

    setSelectedElement(updatedData as SelectedElementInterface);
  }

  return (
    <div className='p-5'>
      <h2 className='font-bold text-xl'>Setting</h2>

      {element?.style?.backgroundColor &&
        <ColorPickerField value={[element?.style?.backgroundColor || '']}
          label='Background Color'
          onHandlerStyle={(value: string) => onHandlerStyle('backgroundColor', [value])}
        />
      }
      {element?.style?.color &&
        <ColorPickerField value={[element?.style?.color]}
          label='Text Color'
          onHandlerStyle={(value: string) => onHandlerStyle('color', [value])}
        />
      }

      {
        element?.type == "Image" &&
        <ImagePreview label='Preview'
          value={[element?.imageUrl || '']}
          onInputHandler={(value: string) => onInputHandler('imageUrl', [value])} />
      }

      {
        (element?.type == "Button" || element?.type == "Text") &&
        <>
          <InputFields label='Content' values={[element?.content || '']}
            onInputHandler={(value: string[]) => onInputHandler('content', value)} />

          <InputFields label='URL' values={[element.url || '']}
            onInputHandler={(value: string[]) => onInputHandler('url', value)} />

          <InputFields label='Font size' values={[element?.style?.fontSize || '']}
            onInputHandler={(value: string[]) => onHandlerStyle('fontSize', value)}
          />
          <InputFields label='Font Weight' values={[element?.style?.fontWeight || '']}
            onInputHandler={(value: string[]) => onHandlerStyle('fontWeight', value)}
          />

          <ToggleAlignmentFileld label="Alignment"
            options={options}
            value={[element?.style?.textAlign || '']}
            onHandlerStyle={(value: string) => onHandlerStyle("textAlign", [value])} />
        </>
      }

      {
        element?.style?.width &&
        <InputFields values={[element?.style?.width || '']}
          label='Width'
          onInputHandler={(value: string[]) => onHandlerStyle('width', value)}
        />
      }

      {element?.style?.padding && <InputFields values={[element?.style?.padding || '']}
        label='Padding'
        onInputHandler={(value: string[]) => onHandlerStyle('padding', value)}
      />}

      {element?.style?.width &&
        <SilderBar label="Width"
          values={[element?.style?.width || '']}
          type="%" onHandlerStyle={(value: string[]) => onHandlerStyle("width", value)} />}

      {(element?.type == "Button" || element?.style?.borderRadius) &&
        <SilderBar label="Border Radius"
          values={[element?.style?.borderRadius || '']}
          type="px" onHandlerStyle={(value: string[]) => onHandlerStyle("borderRadius", value)} />
      }

      <div>
        <h2 className='font-bold text-xl mb-2'>Outer Style</h2>
        {element?.outerStyle?.backgroundColor &&
          <ColorPickerField value={[element?.style?.backgroundColor || '']}
            label='Background Color'
            onHandlerStyle={(value: string) => onHandlerOuterStyle('backgroundColor', value)}
          />}

        {
          element?.outerStyle?.justifyContent &&
          <ToggleAlignmentFileld label="Alignment"
            options={options}
            value={[element?.outerStyle?.justifyContent || '']}
            onHandlerStyle={(value: string) => onHandlerOuterStyle("justifyContent", value)} />
        }
      </div>


    </div>
  )
}

export default Setting