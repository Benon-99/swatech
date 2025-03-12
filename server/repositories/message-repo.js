import prisma from "../prisma/client.js";

export const messageRepository = {
    async createMessage(messageDTO) {
        try {
            const message = await prisma.message.create({
                data: {
                    name: messageDTO.name,
                    email: messageDTO.email,
                    subject: messageDTO.subject,
                    message: messageDTO.message,
                }
            });
            return message;
        } catch (error) {
            throw new Error(`Failed to create message: ${error.message}`);
        }
    },

    async getAllMessages() {
        try {
            const messages = await prisma.message.findMany({
                orderBy: {
                    created_at: 'desc'
                }
            });
            return messages;
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    },

    async getMessage(id) {
        try {
            const message = await prisma.message.findUnique({
                where: { id }
            });
            return message;
        } catch (error) {
            throw new Error(`Failed to fetch message: ${error.message}`);
        }
    },

    async deleteMessage(id) {
        try {
            const message = await prisma.message.delete({
                where: { id }
            });
            return message;
        } catch (error) {
            throw new Error(`Failed to delete message: ${error.message}`);
        }
    }
};