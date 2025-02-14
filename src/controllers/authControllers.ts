// src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { userName, firstName, lastName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        const userExists = await User.findOne({ where: { email } });
        console.log('body body body body',req.body);

        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ ...req.body, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", token: generateToken(newUser.id, newUser.role) });
    } catch (error: any) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    };
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        res.json({ token: generateToken(user.id, user.role) });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
//     try {
//         if (!req.user) return res.status(401).json({ message: "Unauthorized" });
        
//         const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };