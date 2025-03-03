import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import {Role} from "../models/role"
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id: string, role: string) => {
    return jwt.sign({ id, role}, process.env.JWT_SECRET as string, { expiresIn: "1y" });
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { userName, firstName, lastName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // hash password before saving them
        const hashedPassword = await bcrypt.hash(password, 10);

        const learnerRole = await Role.findOne({ where: { name: "Learner" }});

        const newUser = await User.create({ 
            ...req.body, 
            role: learnerRole?.id,
            password: hashedPassword 
        });

        const userRole = await Role.findByPk(newUser.role);
        console.log("user role", userRole);

        res.status(201).json({ message: "User registered successfully",  }); //token: generateToken(newUser.id, newUser.role)
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

        // Retrieve role name dynamically
        const userRole = await Role.findByPk(user.role);
        console.log("user role", userRole?.name);

        res.json({ 
            message: "user logged in successfully!", 
            token: generateToken(user.id, user.role), 
            user: {
                id: user.id,
                role: userRole?.name
            }
            });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Role,
                    as: "roleDetail",
                    attributes: ["name"]
                },
            ],
            });

        const neededUsers = users.map((user) => ({
            id: user.id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            status: user.active,
            role: (user as any).roleDetail.name,
            createdAt: user.createdAt
        }));

        res.status(200).json({ message: "Users retrieved successfully", users: neededUsers });
        return;
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error", error });
        return;
    }
};

// export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const user = await User.findOne({where: { email}});
//         res.status(200).json({ message: "Users retrieved successfully", users });
//         return;
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//         return;
//     }
// };

export const logout = async (req: Request, res: Response) => {
	
};

export const updatePassword = async (req: Request, res: Response) => {

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

