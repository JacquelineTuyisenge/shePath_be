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
exports.deleteTopic = exports.updateTopic = exports.getTopicById = exports.getAllTopics = exports.createTopic = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const topic_1 = __importDefault(require("../models/topic"));
const like_1 = __importDefault(require("../models/like"));
const comment_1 = __importDefault(require("../models/comment"));
dotenv_1.default.config();
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1y" });
};
const createTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { content } = req.body;
        let imageUrl = null;
        if (req.file) {
            const uploadResult = yield cloudinary_1.v2.uploader.upload(req.file.path, {
                public_id: `image/${user.id}`,
                overwrite: true,
            });
            imageUrl = uploadResult.secure_url;
        }
        const topic = yield topic_1.default.create({
            content,
            imageUrl,
            userId: id,
        });
        res.status(201).json({ message: "Topic created successfully", topic });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.createTopic = createTopic;
const getAllTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_1.default.findAll({
            include: [
                { model: user_1.User, as: "user", attributes: ["id", "userName", "email"] },
                { model: comment_1.default, as: "comments" },
                { model: like_1.default, as: "likes" }
            ],
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json({ message: "Topics retrieved", topics });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.getAllTopics = getAllTopics;
const getTopicById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const topic = yield topic_1.default.findByPk(id, {
            include: [
                { model: user_1.User, as: "user", attributes: ["id", "userName", "email"] },
                { model: comment_1.default, as: "comments" },
                { model: like_1.default, as: "likes" }
            ],
        });
        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }
        res.status(200).json({ message: "Topic retrieved", topic });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
});
exports.getTopicById = getTopicById;
const updateTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const topic = yield topic_1.default.findByPk(id);
        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }
        if (topic.userId !== userId) {
            res.status(403).json({ message: "Unauthorized: You can only update your own topic" });
            return;
        }
        const { content } = req.body;
        let imageUrl = topic.imageUrl;
        // Handle image upload if provided
        if (req.file) {
            const uploadResult = yield cloudinary_1.v2.uploader.upload(req.file.path, {
                public_id: `image/${userId}`,
                overwrite: true,
            });
            imageUrl = uploadResult.secure_url;
        }
        yield topic.update({ content, imageUrl });
        res.status(200).json({ message: "Topic updated successfully", topic });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
});
exports.updateTopic = updateTopic;
const deleteTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const topic = yield topic_1.default.findByPk(id);
        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }
        if (topic.userId !== userId) {
            res.status(403).json({ message: "Unauthorized: You can only delete your own topic" });
            return;
        }
        yield topic.destroy();
        res.status(200).json({ message: "Topic deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.deleteTopic = deleteTopic;
