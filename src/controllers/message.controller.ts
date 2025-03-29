
import { Request, Response } from 'express';
import Message from '../models/message';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { email, message } = req.body;

        // Validate input
        if (!email || !message) {
            res.status(400).json({ error: 'Email and message are required' });
            return;
        }

        // Save message to the database
        const newMessage = await Message.create({
            email,
            message,
        });

        res.status(201).json({ message: 'Message sent successfully' , data: newMessage });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.findAll();
        res.status(200).json({messages: "messages retrieved successfully", data: messages});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getMessage = async(req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const message = await Message.findByPk(id);

        if (!message) {
            res.status(404).json({ error: 'Message not found' });
            return;
        }

        res.status(200).json(message);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};