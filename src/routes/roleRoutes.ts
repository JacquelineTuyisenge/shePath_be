import express from "express";
import { allRoles } from "../controllers/roleController";
import { isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/roles", isAdmin, allRoles);

export default router;