import express from "express";
import {getAllUsers, registerUser, loginUser, getProfile, editProfile, forgotPassword, resetPassword} from "../controllers/authControllers";
import { validateRegister, validateLogin } from "../validations/authValidation";
import { isAdmin } from "../middleware/authMiddleware";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", isAdmin, getAllUsers);
router.get("/profile", getProfile);
router.patch("/profile", upload.single("profile"), editProfile);

export default router;