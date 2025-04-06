import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import Topic from "../models/topic";
import Like from "../models/like";
import Comment from "../models/comment";

dotenv.config();

const generateToken = (id: string, role: string) => {
    return jwt.sign({ id, role}, process.env.JWT_SECRET as string, { expiresIn: "1y" });
};

export const createTopic = async (req: Request, res: Response) => {
    try {

        // const token = req.header("Authorization")?.split(" ")[1];
        const token = req.cookies.token;

            if (!token) {
                res.status(401).json({ message: "Unauthorized, login" });
                return;
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const { id } = decoded as JwtPayload;
        
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        
        if (!user) {
            res.status(404).json({ message: 'User  not found' });
            return;
        }

        const { content } = req.body;
        let imageUrl = null;

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                public_id: `image/${user.id}`,
                overwrite: true,
            });

            imageUrl = uploadResult.secure_url;
        }

        const topic = await Topic.create({
            content,
            imageUrl,
            userId: id,
        });

        res.status(201).json({ message: "Topic created successfully", topic });

    }catch(error: any) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAllTopics = async (req: Request, res: Response) => {
    try {
        const topics = await Topic.findAll({
            include: [
                { model: User, as: "user", attributes: ["id", "userName", "email"] },
                { model: Comment, as: "comments" },
                { model: Like, as: "likes" }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ message: "Topics retrieved", topics });
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getTopicById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const topic = await Topic.findByPk(id, {
            include: [
                { model: User, as: "user", attributes: ["id", "userName", "email"] },
                { model: Comment, as: "comments" },
                { model: Like, as: "likes" }
            ],
        });

        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }

        res.status(200).json({ message: "Topic retrieved", topic });
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
};
export const updateTopic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const token = req.cookies.token;

        // const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const userId = (decoded as JwtPayload).id;

        const topic = await Topic.findByPk(id);

        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }

        if (topic.userId !== userId) {
            res.status(403).json({ message: "Unauthorized: You can only update your own topic" });
            return;
        }

        const { content } = req.body;
        let imageUrl = topic.imageUrl;

        // Handle image upload if provided
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                public_id: `image/${userId}`,
                overwrite: true,
            });

            imageUrl = uploadResult.secure_url;
        }

        await topic.update({ content, imageUrl });

        res.status(200).json({ message: "Topic updated successfully", topic });
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
};

export const deleteTopic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // const token = req.header("Authorization")?.split(" ")[1];
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const userId = (decoded as JwtPayload).id;

        const topic = await Topic.findByPk(id);

        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }

        if (topic.userId !== userId) {
            res.status(403).json({ message: "Unauthorized: You can only delete your own topic" });
            return;
        }

        await topic.destroy();
        res.status(200).json({ message: "Topic deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

