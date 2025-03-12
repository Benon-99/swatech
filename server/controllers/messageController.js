import { MessageDTO } from '../DTOs/messageDTO.js';
import { messageRepository } from '../repositories/message-repo.js';

export const createMessageController = async (req, res) => {
    try {
        const messageDTO = new MessageDTO(req.body);
        const message = await messageRepository.createMessage(messageDTO);
        res.status(201).json({ status: 'success', message });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

export const getAllMessagesController = async (req, res) => {
    try {
        const messages = await messageRepository.getAllMessages();
        res.status(200).json({ status: 'success', messages });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

export const getMessageController = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await messageRepository.getMessage(parseInt(id));
        if (!message) {
            return res.status(404).json({ status: 'fail', message: 'Message not found' });
        }
        res.status(200).json({ status: 'success', message });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

export const deleteMessageController = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await messageRepository.deleteMessage(parseInt(id));
        res.status(200).json({ status: 'success', message });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};