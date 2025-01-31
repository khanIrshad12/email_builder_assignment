// Add these interfaces at the top of your helper provider file
export interface LayoutType {
    id?: number;
    label: string;
    type: string;
    numOfCol: number;
    icon: React.ElementType;
    [key: number]: {
        icon: React.ElementType;
        label: string;
        type: string;
        content: string;
        imageUrl: string;
        url: string;
        style: {
            backgroundColor: string;
            color: string;
            padding: string;
            width: string;
            textAlign: string;
            fontSize: string;
            borderRadius: string;
            fontWeight: string;
            cursor: string;
        };
        outerStyle: {
            display: string;
            justifyContent: string;
            alignItems: string;
        };
    };

    elements?: DragElementLayoutElement[]; // add this line

    /*  columns: (DragElementLayoutElement | undefined)[]; */
}

export type ElementData = {
    icon: React.ComponentType;
    label: string;
    type: string;
    style: React.CSSProperties;
    outerStyle?: React.CSSProperties;
    id?: number;
    dragLayout?: LayoutType;
    dragElement?: DragElementLayoutElement;
    imageUrl?: string;
} & (
        | {
            type: "Button";
            content: string;
            url: string;
        }
        | {
            type: "Text";
            content: string;
        }
        | {
            type: "Image" | "Logo" | "LogoHeader";
            imageUrl: string;
            alt: string;
        }
        | {
            type: "Divider";
        }
        | {
            type: "Social Media";
        }
    );

export interface DragElementLayoutElement {
    icon: React.ElementType;
    label: string;
    type: string;
    content: string;
    imageUrl: string;
    alt?: string;
    url: string;
    style: React.CSSProperties;
    outerStyle: {
        display: string;
        justifyContent: string;
        alignItems: string;
    };
    id?: number;
    dragLayout?: LayoutType;

    dragElement?: ElementData;
}

export interface DragElementLayout {
    dragElement?: DragElementLayoutElement;
    dragLayout?: LayoutType;
}

export interface SelectedElementInterface {
    layout: LayoutType;
    index: number;
}
export type DragElementPayload =
    | { type: 'layout'; data?: LayoutType }
    | { type: 'element'; data?: DragElementLayoutElement };

export interface HelperContextType {
    screenSize: string;
    dragElementLayout: DragElementPayload | null;
    setDragElementLayout: React.Dispatch<React.SetStateAction<DragElementPayload | null>>;
    setScreenSize: React.Dispatch<React.SetStateAction<string>>;
    emailTemplate: LayoutType[];
    setEmailTemplate: React.Dispatch<React.SetStateAction<LayoutType[]>>;
    selectedElement: SelectedElementInterface | null;
    setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElementInterface | null>>;
}