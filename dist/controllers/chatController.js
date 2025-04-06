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
exports.getAllChats = exports.getChats = exports.sendChat = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId, content } = req.body;
    try {
        const chat = yield chat_1.default.create({ senderId, receiverId, content });
        res.status(201).json({ message: "chat is sent", chat });
        return;
    }
    catch (error) {
        console.log("Error sending Chat", error);
        res.status(500).json({ message: "Failed to send Chat", error });
        return;
    }
});
exports.sendChat = sendChat;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const chats = yield chat_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: [
                { model: user_1.default, as: "sender" },
                { model: user_1.default, as: "receiver" }
            ]
        });
        res.status(200).json({ message: "Single chat retrieved gracefully!", chats });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Chats" });
        return;
    }
});
exports.getChats = getChats;
const getAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    // const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized, login" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const chats = yield chat_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: [
                { model: user_1.default, as: "sender" },
                { model: user_1.default, as: "receiver" }
            ]
        });
        res.status(200).json({ message: "All chats!", chats });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Chats" });
        return;
    }
});
exports.getAllChats = getAllChats;
