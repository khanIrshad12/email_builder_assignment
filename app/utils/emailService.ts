import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'khanirshad14312345@gmail.com',
        // Use an app-specific password generated from Google Account settings
        pass: process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD
    }
});

export async function sendTemplateEmail({
    to,
    subject,
    htmlContent
}: {
    to: string;
    subject: string;
    htmlContent: string;
}) {
    try {
        const mailOptions = {
            from: 'khanirshad14312345@gmail.com',
            to,
            subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error || 'Failed to send email' };
    }
}