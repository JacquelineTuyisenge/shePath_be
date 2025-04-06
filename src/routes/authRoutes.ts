import express from "express";
import { Request, Response } from "express";
import {getAllUsers, getAllMentors, registerUser, loginUser, getProfile, editProfile, forgotPassword, resetPassword, logoutUser} from "../controllers/authControllers";
import { validateRegister, validateLogin } from "../validations/authValidation";
import { authenticateUser, isAdmin, isAuthenticated } from "../middleware/authMiddleware";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/check", isAuthenticated);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", isAdmin, getAllUsers);
router.get("/mentors", authenticateUser, getAllMentors);
router.get("/profile", getProfile);
router.patch("/profile", upload.single("profile"), editProfile);
router.post('/logout', logoutUser);

export default router;