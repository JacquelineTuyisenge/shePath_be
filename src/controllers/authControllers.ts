import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import {Role} from "../models/role";
import { v2 as cloudinary } from 'cloudinary';
import { sendEMail } from "../utils/nodemailer";
import dotenv from "dotenv";


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

export const forgotPassword = async (req: Request, res: Response) => {
  try{

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
  
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
  
    const token = generateToken(user.id, user.role);
    const host = process.env.BASE_URL || `http://localhost:5173`
    const resetLink: string = `${host}/reset-password?token=${token}`;
  
    const mail = {
      to: email,
      subject: "RESET PASSWORD",
      html: `
          <p>Click <a href="${resetLink}">here</a> to reset your password
      `,
    };
  
    await sendEMail(mail);
    res.status(200).json({message: "Email Sent Successfully", mail});
    
  } catch(error: any) {
    res.status(500).json({message: "Something went wrong"});
    return;
  }
};

export const resetPassword = async (req: Request, res:Response) => {

    try {
        const {newPassword} = req.body;
        
        const {token} = req.query;

        if (!token) {
            res.status(400).json({ message: "Token is required" });
            return;
        }


        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string };
        const user = await User.findByPk(decoded.id);

        if (!user) {
            res.status(400).json({ message: "Invalid token" });
            return;
        }

        if(newPassword === user.password){
            res.status(400).json({message: "Password can not be same as old one"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword });

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
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


export const getProfile = async (req: Request, res: Response) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const { id } = decoded as JwtPayload;

        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

        const userProfile = {
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            userName: user?.userName,
            email: user?.email,
            gender: user?.gender,
            birthDate: user?.birthDate,
            phoneNumber: user?.phoneNumber,
            profile: user?.profile,
            address: user?.address,
            country: user?.country,
            city: user?.city,
        };

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Here is your Profile', userProfile});
        return;
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
        return;
    }
};

// Edit user profile
export const editProfile = async (req: Request, res: Response) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
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

        const { firstName, lastName, userName, email, phoneNumber, gender, birthDate, profile, address, country, city } = req.body;

        // profile image upload

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                public_id: `image/${user.id}`,
                overwrite: true,
            });

            user.profile = uploadResult.secure_url;
        }

        // Update user fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.userName = userName || user.userName;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.gender = gender || user.gender;
        user.birthDate = birthDate || user.birthDate;
        user.address = address || user.address;
        user.country = country || user.country;
        user.city = city || user.city;

        await user.save();

        // Exclude password from the response
        const updatedUserProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            gender: user.gender,
            birthDate: user.birthDate,
            phoneNumber: user.phoneNumber,
            profile: user.profile,
            address: user.address,
            country: user.country,
            city: user.city,
        };

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUserProfile });
        return;
    } catch (error: any) {
        console.log("eroroorrr", error)
        res.status(500).json({ message:  'SomeTHING WENT wrong', error});
        return;
    }
};
