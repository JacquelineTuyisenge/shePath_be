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
exports.getLikeCount = exports.toggleLike = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const like_1 = __importDefault(require("../models/like"));
const topic_1 = __importDefault(require("../models/topic"));
const toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const token = req.header("Authorization")?.split(" ")[1];
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized, login" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const { topicId, commentId } = req.body;
        if (!topicId) {
            res.status(400).json({ message: "Provide topicId" });
            return;
        }
        let target;
        if (topicId)
            target = yield topic_1.default.findByPk(topicId);
        if (!target) {
            res.status(404).json({ message: "Target not found" });
            return;
        }
        const existingLike = yield like_1.default.findOne({ where: { userId, topicId } });
        if (existingLike) {
            yield existingLike.destroy();
            res.status(200).json({ message: "Unliked successfully" });
            return;
        }
        yield like_1.default.create({ userId, topicId });
        res.status(201).json({ message: "Liked successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
});
exports.toggleLike = toggleLike;
const getLikeCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topicId, commentId } = req.params;
        if (!topicId && !commentId) {
            res.status(400).json({ message: "Neither Topic nor Comment is available" });
            return;
        }
        const likeCount = yield like_1.default.count({ where: { topicId, commentId } });
        res.status(200).json({ message: "Like count that is retrieved", count: likeCount });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        return;
    }
});
exports.getLikeCount = getLikeCount;
