import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { sendTemplateEmail } from '@/app/utils/emailService';


export async function POST(req: Request) {
    const session = await auth();
    
    try {
        // Get the authenticated user's email
        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { htmlContent, subject } = await req.json();

        if (!htmlContent) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const result = await sendTemplateEmail({
            to: session.user.email || '',
            subject: subject || 'Your Email Template',
            htmlContent
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            messageId: result.messageId
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}