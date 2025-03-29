"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const router = (0, express_1.Router)();
router.post("/", chatController_1.sendChat);
router.get("/:userId", chatController_1.getChats);
router.get("/", chatController_1.getAllChats);
exports.default = router;
