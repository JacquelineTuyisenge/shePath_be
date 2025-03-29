"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticateUser, message_controller_1.sendMessage);
router.get('/', authMiddleware_1.isAdmin, message_controller_1.getMessages);
router.get('/:id', authMiddleware_1.isAdmin, message_controller_1.getMessage);
exports.default = router;
