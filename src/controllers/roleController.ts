import { Request, Response } from "express";
import {Role} from "../models/role";
import User from "../models/user";
import { sendResponse } from "../utils/response";
import { sendEMail } from "../utils/nodemailer";


export const allRoles = async (req: Request, res: Response) => {
    try{
        const roles = await Role.findAll();
        res.status(200).json({message: "all roles", roles});
        return;
    }catch(error){
        res.status(500).json({message: "Something went wrong", error});
        return;
    }
};

export const createRole = async (req: Request, res: Response) => {
    try{
        const {role} = req.body;

		let condition = { where: { name: req.body.role } };


        const roleExists = await Role.findOne(condition);
        
        if(roleExists){
            res.status(400).json({message: "Role already exists"});
            return;
        }

        const newRole = await Role.create({
            name: role
        });
        res.status(201).json({message: "Role created successfully", newRole});
        return;

    }catch(error){
        res.status(500).json({message: 'Something went wrong', error});
    }
};

export const assignRole = async (req: Request, res: Response) => {
    try {
        const { role } = req.body;
        const userId = req.params.userId;

        const existingRole = await Role.findOne({ where: { name: role } });
        console.log("existingRole",existingRole);

        if (!existingRole) {
            sendResponse(res, 404, "NOT FOUND", "Role not found");
            return;
        }

        const user = await User.findByPk(userId);

        console.log("user",user);
        if (!user) {
            sendResponse(res, 404, "NOT FOUND", "User not found");
            return;
        }

        const email = user.email;

        await User.update({ role: existingRole.id }, { where: { id: userId } });

        const updatedUser = await User.findOne({
            where: { id: userId },
            include: [{ model: Role, as: "roleDetail" }],
        });

        if (email) {
            const mail = {
                to: email,
                subject: "Role changed",
                html: `
                    <p> Dear ${user.firstName}, we are pleased to tell you that your role on ShePath platform has been updated. Please log in again for a new experience! If you encounter any issues, do not hesitate to contact us.</p>
                `,
            };

            try {
                await sendEMail(mail);
                console.log(`Email sent to ${email}`);
            } catch (emailError) {
                console.error("Error sending email:", emailError);
            }
        } else {
            console.log("User  email is undefined, email not sent.");
        }

        sendResponse(res, 201, "SUCCESS", "Role assigned successfully!", updatedUser);
        return;
    } catch (error:any) {
        sendResponse(res, 500, "SERVER ERROR", "Something went wrong!", error.message);
        return;
    }
};

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await Role.findOne({ where: { id } });
        if (!role) {
            sendResponse(res, 404, "NOT FOUND", `Role with ID ${id} doesn't exist`);
            return;
        }

        await Role.update({ name: req.body.name }, { where: { id } });

        sendResponse(res, 201, "SUCCESS", "Role updated successfully");
        return;
    } catch (error: any) {
        sendResponse(res, 500, "SERVER ERROR", "Something went wrong!", error.message);
        return;
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await Role.findOne({ where: { id } });
        if (!role) {
            sendResponse(res, 404, "NOT FOUND", `Role with ID ${id} doesn't exist`);
            return;
        }

        await Role.destroy({ where: { id } });

        sendResponse(res, 201, "SUCCESS", "Role deleted successfully");
    } catch (error: any) {
        sendResponse(res, 500, "SERVER ERROR", "Something went wrong!", error.message);
        return;
    }
};