import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
import Role from "../models/role";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; role: string };
        }
    }
}


// export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.header("Authorization")?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Unauthorized, login" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
//         const user = await User.findByPk(decoded.id, {
//             include: { model: Role, as: "role", attributes: ["name"] },
//         });

//         if (!user) return res.status(401).json({ message: "User not found" });

//         req.user = { id: user.id, role: user.role?.name };

//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

export const isOverSeer = (req: Request, res: Response, next: NextFunction) => { //admin
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized, login" });


}