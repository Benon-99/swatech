import express from 'express';
import {
    createMessageController,
    getAllMessagesController,
    getMessageController,
    deleteMessageController
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/', createMessageController);
router.get('/', getAllMessagesController);
router.get('/:id', getMessageController);
router.delete('/:id', deleteMessageController);

export default router;