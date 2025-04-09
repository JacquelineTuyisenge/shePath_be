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
exports.logoutUser = exports.editProfile = exports.getProfile = exports.getAllMentors = exports.getAllUsers = exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const role_1 = require("../models/role");
const cloudinary_1 = require("cloudinary");
const nodemailer_1 = require("../utils/nodemailer");
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
        res.status(201).json({ message: "User registered successfully", });
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
        if (!userRole) {
            res.status(404).json({ message: "no role found" });
            return;
        }
        console.log("user role", userRole === null || userRole === void 0 ? void 0 : userRole.name);
        const token = generateToken(user.id, user.role);
        res.cookie("token", token, {
            // httpOnly: false,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // secure: false,
            // sameSite: "strict",
            sameSite: "none",
            maxAge: 365 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "user logged in successfully!",
            // token: generateToken(user.id, user.role), 
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
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const token = generateToken(user.id, user.role);
        const host = process.env.BASE_URL || `http://localhost:5173`;
        const resetLink = `${host}/reset-password?token=${token}`;
        const mail = {
            to: email,
            subject: "RESET PASSWORD",
            html: `
          <p>Click <a href="${resetLink}">here</a> to reset your password
      `,
        };
        yield (0, nodemailer_1.sendEMail)(mail);
        res.status(200).json({ message: "Email Sent Successfully", mail });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        return;
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newPassword } = req.body;
        const { token } = req.query;
        if (!token) {
            res.status(400).json({ message: "Token is required" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield user_1.User.findByPk(decoded.id);
        if (!user) {
            res.status(400).json({ message: "Invalid token" });
            return;
        }
        if (newPassword === user.password) {
            res.status(400).json({ message: "Password can not be same as old one" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        yield user.update({ password: hashedPassword });
        res.json({ message: "Password reset successful" });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
});
exports.resetPassword = resetPassword;
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
            phoneNumber: user.phoneNumber,
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
const getAllMentors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mentorRole = yield role_1.Role.findOne({
        where: {
            name: 'Mentor'
        },
    });
    if (!mentorRole) {
        res.status(404).json({ message: "Mentor role not found" });
        return;
    }
    ;
    try {
        const mentors = yield user_1.User.findAll({
            where: { role: mentorRole.id },
            include: [{
                    model: role_1.Role,
                    as: "roleDetail"
                }]
        });
        const neededMentors = mentors.map((mentor) => ({
            id: mentor.id,
            userName: mentor.userName,
            firstName: mentor.firstName,
            lastName: mentor.lastName,
            email: mentor.email,
            phoneNumber: mentor.phoneNumber,
            profile: mentor.profile,
            status: mentor.active,
            role: mentor.roleDetail.name,
            address: mentor.address,
            city: mentor.city,
            country: mentor.country,
            createdAt: mentor.createdAt
        }));
        res.status(200).json({ message: "Mentors Retrieved Successfully", mentors: neededMentors });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log("Errrrrrrrrorrrrr", error);
        return;
    }
});
exports.getAllMentors = getAllMentors;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        // const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;
        const user = yield user_1.User.findByPk(id, { attributes: { exclude: ['password'] } });
        const userProfile = {
            id: user === null || user === void 0 ? void 0 : user.id,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            userName: user === null || user === void 0 ? void 0 : user.userName,
            email: user === null || user === void 0 ? void 0 : user.email,
            gender: user === null || user === void 0 ? void 0 : user.gender,
            birthDate: user === null || user === void 0 ? void 0 : user.birthDate,
            phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
            profile: user === null || user === void 0 ? void 0 : user.profile,
            address: user === null || user === void 0 ? void 0 : user.address,
            country: user === null || user === void 0 ? void 0 : user.country,
            city: user === null || user === void 0 ? void 0 : user.city,
        };
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Here is your Profile', userProfile });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
        return;
    }
});
exports.getProfile = getProfile;
// Edit user profile
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;
        const user = yield user_1.User.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user) {
            res.status(404).json({ message: 'User  not found' });
            return;
        }
        const { firstName, lastName, userName, email, phoneNumber, gender, birthDate, profile, address, country, city } = req.body;
        // profile image upload
        if (req.file) {
            const uploadResult = yield cloudinary_1.v2.uploader.upload(req.file.path, {
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
        yield user.save();
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
    }
    catch (error) {
        console.log("eroroorrr", error);
        res.status(500).json({ message: 'SomeTHING WENT wrong', error });
        return;
    }
});
exports.editProfile = editProfile;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            // secure: false,
            // sameSite: "strict",
            sameSite: "none",
            // httpOnly: false,
            secure: process.env.NODE_ENV === "production"
            // sameSite: "strict",
            // path: "/" // Ensure this matches the path used when setting the cookie
        });
        res.status(200).json({
            message: "User logged out successfully"
        });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            message: "Server error during logout",
            error: error.message
        });
    }
});
exports.logoutUser = logoutUser;
