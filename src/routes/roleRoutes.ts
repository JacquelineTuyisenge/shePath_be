import express from "express";
import { allRoles, createRole, assignRole, updateRole, deleteRole } from "../controllers/roleController";
import { isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/all", isAdmin, allRoles);
router.post("/new",isAdmin, createRole);
router.patch("/assign/:userId",isAdmin, assignRole);
router.patch("/update/:id",isAdmin, updateRole);
router.delete("/delete/:id",isAdmin, deleteRole);

export default router;