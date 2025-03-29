import { Request, Response } from "express";
import Chat from "../models/chat";
import { Op } from "sequelize";
import User from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";

export const sendChat = async (req: Request, res: Response) => {
    const { senderId, receiverId, content } = req.body;

    try {
        const chat = await Chat.create({ senderId, receiverId, content });
        res.status(201).json({message: "chat is sent", chat});
        return;
    } catch (error) {
        console.log("Error sending Chat", error)
        res.status(500).json({ message: "Failed to send Chat", error});
        return;
    }
};

export const getChats = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const chats = await Chat.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: [
                { model: User, as: "sender" },
                { model: User, as: "receiver" }
            ]
        });
        res.status(200).json({message: "Single chat retrieved gracefully!", chats});
        return;
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Chats" });
        return;
    }
};

export const getAllChats = async (req: Request, res:Response) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized, login" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const userId = decoded.id;

        const chats = await Chat.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: [
                { model: User, as: "sender" },
                { model: User, as: "receiver" }
            ]

        });

        res.status(200).json({message: "All chats!", chats});
        return;
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Chats" });
        return;
    }
}