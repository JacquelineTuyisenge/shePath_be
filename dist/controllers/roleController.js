"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.assignRole = exports.createRole = exports.allRoles = void 0;
const role_1 = require("../models/role");
const user_1 = __importDefault(require("../models/user"));
const response_1 = require("../utils/response");
const allRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_1.Role.findAll();
        res.status(200).json({ message: "all roles", roles });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
        return;
    }
});
exports.allRoles = allRoles;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        let condition = { where: { name: req.body.role } };
        const roleExists = yield role_1.Role.findOne(condition);
        if (roleExists) {
            res.status(400).json({ message: "Role already exists" });
            return;
        }
        const newRole = yield role_1.Role.create({
            name: role
        });
        res.status(201).json({ message: "Role created successfully", newRole });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.createRole = createRole;
const assignRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        const userId = req.params.userId;
        // Find role by name
        const existingRole = yield role_1.Role.findOne({ where: { name: role } });
        console.log("existingRole", existingRole);
        if (!existingRole) {
            (0, response_1.sendResponse)(res, 404, "NOT FOUND", "Role not found");
            return;
        }
        // Find user by ID
        const user = yield user_1.default.findByPk(userId);
        console.log("user", user);
        if (!user) {
            (0, response_1.sendResponse)(res, 404, "NOT FOUND", "User not found");
            return;
        }
        // Assign role to user
        yield user_1.default.update({ role: existingRole.id }, { where: { id: userId } });
        // Fetch updated user with role details
        const updatedUser = yield user_1.default.findOne({
            where: { id: userId },
            include: [{ model: role_1.Role, as: "roleDetail" }],
        });
        (0, response_1.sendResponse)(res, 201, "SUCCESS", "Role assigned successfully!", updatedUser);
        return;
    }
    catch (error) {
        (0, response_1.sendResponse)(res, 500, "SERVER ERROR", "Something went wrong!", error.message);
        return;
    }
});
exports.assignRole = assignRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Find role by ID
        const role = yield role_1.Role.findOne({ where: { id } });
        if (!role) {
            (0, response_1.sendResponse)(res, 404, "NOT FOUND", `Role with ID ${id} doesn't exist`);
            return;
        }
        // Update role name
        yield role_1.Role.update({ name: req.body.name }, { where: { id } });
        (0, response_1.sendResponse)(res, 201, "SUCCESS", "Role updated successfully");
        return;
    }
    catch (error) {
        (0, response_1.sendResponse)(res, 500, "SERVER ERROR", "Something went wrong!", error.message);
        return;
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Find role by ID
        const role = yield role_1.Role.findOne({ where: { id } });
        if (!role) {
            (0, response_1.sendResponse)(res, 404, "NOT FOUND", `Role with ID ${id} doesn't exist`);
            return;
        }
        // Delete role
        yield role_1.Role.destroy({ where: { id } });
        (0, response_1.sendResponse)(res, 201, "SUCCESS", "Role deleted successfully");
    }
    catch (error) {
        (0, response_1.sendResponse)(res, 500, "SERVER ERROR", "Something went wrong!", error.message);
        return;
    }
});
exports.deleteRole = deleteRole;
