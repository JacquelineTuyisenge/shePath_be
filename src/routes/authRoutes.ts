import express from "express";
import { registerUser, loginUser} from "../controllers/authControllers";
import { authenticateUser } from "../middleware/authMiddleware";
import { validateRegister, validateLogin } from "../validations/authValidation";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
// router.get("/profile", authenticateUser, getProfile);

export default router;