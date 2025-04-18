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
exports.createComment = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const comment_1 = __importDefault(require("../models/comment"));
const topic_1 = __importDefault(require("../models/topic"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const token = req.header("Authorization")?.split(" ")[1];
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const { topicId, content } = req.body;
        const topic = yield topic_1.default.findByPk(topicId);
        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }
        const comment = yield comment_1.default.create({ content, userId, topicId });
        res.status(201).json({ message: "Comment added successfully", comment });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
});
exports.createComment = createComment;
