import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Like from "../models/like";
import { User } from "../models/user";
import Topic from "../models/topic";
import Comment from "../models/comment";

export const toggleLike = async (req: Request, res: Response) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const userId = decoded.id;
        const { topicId, commentId } = req.body;

        if (!topicId) {
            res.status(400).json({ message: "Provide topicId" });
            return;
        }

        let target;
        if (topicId) target = await Topic.findByPk(topicId);

        if (!target) {
            res.status(404).json({ message: "Target not found" });
            return;
        }

        const existingLike = await Like.findOne({ where: { userId, topicId } });

        if (existingLike) {
            await existingLike.destroy();
            res.status(200).json({ message: "Unliked successfully" });
            return;
        }

        await Like.create({ userId, topicId });

        res.status(201).json({ message: "Liked successfully" });
        return;

    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
};

export const getLikeCount = async (req: Request, res: Response) => {
    try {
        const { topicId, commentId } = req.params;

        if (!topicId && !commentId) {
            res.status(400).json({ message: "Neither Topic nor Comment is available" });
            return;
        }

        const likeCount = await Like.count({ where: { topicId, commentId } });

        res.status(200).json({ message: "Like count that is retrieved", count: likeCount });

    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
};
