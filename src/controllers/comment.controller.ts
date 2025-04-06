import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Comment from "../models/comment";
import { User } from "../models/user";
import Topic from "../models/topic";

export const createComment = async (req: Request, res: Response) => {
    try {
        // const token = req.header("Authorization")?.split(" ")[1];
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const userId = decoded.id;
        const { topicId, content } = req.body;

        const topic = await Topic.findByPk(topicId);
        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }

        const comment = await Comment.create({ content, userId, topicId });

        res.status(201).json({ message: "Comment added successfully", comment });
        return;

    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
};
