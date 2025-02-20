import express from "express";
import {getAllUsers, registerUser, loginUser} from "../controllers/authControllers";
import { validateRegister, validateLogin } from "../validations/authValidation";
import { isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/users", isAdmin, getAllUsers)
// router.get("/profile", authenticateUser, getProfile);

export default router;