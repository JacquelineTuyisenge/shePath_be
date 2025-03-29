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
exports.checkRole = exports.authenticateUser = exports.isAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
const role_1 = require("../models/role");
dotenv_1.default.config();
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "No token, authorization denied" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield user_1.User.findByPk(decoded.id);
        if (!user) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        const userRole = yield role_1.Role.findByPk(user.role);
        if ((userRole === null || userRole === void 0 ? void 0 : userRole.name) !== "Admin") {
            res.status(403).json({ message: "Access denied, FORBIDDEN" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "something went wrong", error });
        return;
    }
});
exports.isAdmin = isAdmin;
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized, login" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(405).json({ message: "Something went wrong" });
        return;
    }
});
exports.authenticateUser = authenticateUser;
const checkRole = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming `req.user` is set from authentication middleware
            if (!userId) {
                res.status(401).json({ success: false, message: "Unauthorized" });
                return;
            }
            const user = yield user_1.User.findByPk(userId);
            if (!user) {
                res.status(401).json({ success: false, message: "User not found" });
                return;
            }
            if (!allowedRoles.includes(user.role)) {
                res.status(403).json({ success: false, message: "Forbidden: Insufficient permissions" });
                return;
            }
            next();
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Server error" });
            return;
        }
    });
};
exports.checkRole = checkRole;
