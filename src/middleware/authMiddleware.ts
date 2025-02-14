import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        // req.user = { id: decoded.id };
        const id = decoded.id
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};