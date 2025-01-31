import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect } from 'react'
import { LayoutType } from '../types';

const Workspace = ({ EmailId, handleCreateTemplate }: { EmailId: string, handleCreateTemplate: () => void }) => {
    const [emailList, setEmailList] = React.useState<{ _id: string; _creationTime: number; email: string; tid: string; design: []; }[]>([]);
    const convex = useConvex();
    const fetchEmailList = async () => {
        const templates = await convex.query(api.emailTemplate.GetTemplateByEmail, { email: EmailId });
        console.log("templates", templates);

        if (templates?.length == 0) {
            setEmailList([]);
        } else {
            console.log("templates", templates);
            setEmailList(templates);
        }
    }

    useEffect(() => {
        fetchEmailList();
    }, []);

    return (
        <div className="flex flex-col mt-14">
            <h1 className="text-3xl font-bold">Workspace</h1>

            {emailList.length === 0 ? (
                <div className="flex justify-center items-center flex-col">
                    <Image
                        src="/email_empty.jpg"
                        alt="Empty List"
                        className="h-250 w-250"
                        width={250}
                        height={250}
                    />
                    <Button className="mt-2 w-28 px-4" onClick={handleCreateTemplate}>+Create New</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {emailList.map((template) => {
                        let parsedDesign;
                        try {
                            parsedDesign = JSON.parse(template.design as unknown as string);
                            console.log("parsedDesign", parsedDesign);

                        } catch (error) {
                            console.error("Error parsing design JSON:", error);
                            parsedDesign = [];
                        }

                        return (
                            <Link href={`/editor/${template.tid}`} key={template._id} className="border p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold">Template ID: {template.tid}</h2>
                                <p className="text-gray-600">Email: {template.email}</p>

                                {/* Render Parsed Design */}
                                <div className="mt-2">
                                    {parsedDesign.map((column: LayoutType, index: number) => {
                                        console.log("column", column);
                                        return (
                                            <div key={index} className=" p-2 mb-2 rounded">
                                                {Object.values(column).map((item, idx: number) => {

                                                    if (item.type === 'Text') {
                                                        return (
                                                            <p key={idx} style={item.style} className="text-center">
                                                                {item.content}
                                                            </p>
                                                        );
                                                    } else if (item.type === 'Button') {
                                                        return (
                                                            <div
                                                                key={idx}

                                                                style={item.style}
                                                                className="block text-center"
                                                            >
                                                                {item.content}
                                                            </div>
                                                        );
                                                    } else if (item.type === 'Image') {
                                                        return (
                                                            <img
                                                                key={idx}
                                                                src={item.imageUrl}
                                                                alt={item.alt || 'Image'}
                                                                width={200}
                                                                height={100}
                                                                style={item.style}
                                                                className="mx-auto"
                                                            />
                                                        );
                                                    }
                                                    return null;
                                                })}
                                                {column.elements?.map((element, idx: number) => {
                                                    if (element?.type === 'Text') {
                                                        return (
                                                            <p key={idx} style={element?.style} className="text-center">
                                                                {element?.content}
                                                            </p>
                                                        );
                                                    } else if (element?.type === 'Button') {
                                                        return (
                                                            <div
                                                                key={idx}

                                                                style={element?.style}
                                                                className="block text-center"
                                                            >
                                                                {element?.content}
                                                            </div>
                                                        );
                                                    } else if (element?.type === 'Image') {
                                                        return (
                                                            <img
                                                                key={idx}
                                                                src={element?.imageUrl}
                                                                alt={element?.alt || 'Image'}
                                                                width={200}
                                                                height={100}
                                                                style={element?.style}
                                                                className="mx-auto"
                                                            />
                                                        );
                                                    }
                                                    return null;

                                                })}
                                            </div>
                                        )
                                    }

                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default Workspace