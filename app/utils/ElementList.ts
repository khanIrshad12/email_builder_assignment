import { Frame, Image, PanelTop, RectangleEllipsis, SquareSplitVertical, TextSelectIcon, Twitter } from "lucide-react";

export default [
    {
        icon: RectangleEllipsis,
        label: "Button",
        type: "Button",
        content: 'Sample Button',
        url: 'example.com',
        style: {
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px",
            width: "100%",
            textAlign: "center",
            fontSize: "16px",
            borderRadius: "10px",
            fontWeight: "normal",
            cursor: "pointer"
        },
        outerStyle: {
            display: "flex",
            alignItems: 'item-center',
            justifyContent: 'justify-center'
        }
    },
    {
        icon: TextSelectIcon,
        type: 'Text',
        label: 'Text',
        content: 'Sample Text',
        style: {
            backgroundColor: "",
            color: "#000",
            width: "100%",
            padding: "10px",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "normal",

        }
    }, {
        icon: Image,
        type: 'Image',
        label: 'Image',
        imageUrl: "/image.png",
        alt: 'Image',
        style: {
            backgroundColor: "#fff",
            padding: "10px",
            height: "50%",
            width: "70%",
            borderRadius: "10px",
        },
        outerStyle: {
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            backgroundColor: "#fff"
        }
    },
    {
        icon: Frame,
        type: "Logo",
        label: "Logo",
        imageUrl: "/logo.jpg",
        alt: "Logo",
        style: {
            backgroundColor: "#fff",
            padding: "10px",
            height: "25%",
            width: "25%"
        },
        outerStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            width: "100%"
        }

    },
    {
        icon: SquareSplitVertical,
        type: "Divider",
        label: "Divider",
        style: {
            color: "#000",
            padding: "10px",
            width: "100%",
        },
    },
    {
        icon: Twitter,
        type: "Social Media",
        label: "Social Icons",
        style: {
            backgroundColor: "#fff",
            padding: "10px",
            height: "20%",
            width: "20%"
        },
        outerStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff"
        }
    },
    {
        icon: PanelTop,
        type: "LogoHeader",
        label: "Logo Header",
        imageUrl: "/logo.jpg",
        alt: "Logo",
        style: {
            backgroundColor: "#fff",
            padding: "10px",
            height: "100%",
            width: "30%",
            color: "#000",

        },

    }

]