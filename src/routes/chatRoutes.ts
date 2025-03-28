import { Router } from "express";
import { sendChat, getChats, getAllChats } from "../controllers/chatController";

const router = Router();

router.post("/", sendChat);
router.get("/:userId", getChats);
router.get("/", getAllChats);

export default router;