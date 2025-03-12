import express from 'express';
import { sendEmail } from '../services/emailService.js';
import { messageRepository } from '../repositories/message-repo.js';

const router = express.Router();

router.post('/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Store message in database
        await messageRepository.createMessage({
            name,
            email,
            message,
            subject
        });

        // Send email to admin
        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${subject}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
            `
        });

        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error in send-email route:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

export default router;
