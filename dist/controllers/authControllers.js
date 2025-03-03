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
exports.updatePassword = exports.logout = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const role_1 = require("../models/role");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1y" });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, firstName, lastName, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        const userExists = yield user_1.User.findOne({ where: { email } });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // hash password before saving them
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const learnerRole = yield role_1.Role.findOne({ where: { name: "Learner" } });
        const newUser = yield user_1.User.create(Object.assign(Object.assign({}, req.body), { role: learnerRole === null || learnerRole === void 0 ? void 0 : learnerRole.id, password: hashedPassword }));
        const userRole = yield role_1.Role.findByPk(newUser.role);
        console.log("user role", userRole);
        res.status(201).json({ message: "User registered successfully", }); //token: generateToken(newUser.id, newUser.role)
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
    ;
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        // Retrieve role name dynamically
        const userRole = yield role_1.Role.findByPk(user.role);
        console.log("user role", userRole === null || userRole === void 0 ? void 0 : userRole.name);
        res.json({
            message: "user logged in successfully!",
            token: generateToken(user.id, user.role),
            user: {
                id: user.id,
                role: userRole === null || userRole === void 0 ? void 0 : userRole.name
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.findAll({
            include: [
                {
                    model: role_1.Role,
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
            role: user.roleDetail.name,
            createdAt: user.createdAt
        }));
        res.status(200).json({ message: "Users retrieved successfully", users: neededUsers });
        return;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.getAllUsers = getAllUsers;
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
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.logout = logout;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updatePassword = updatePassword;
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
