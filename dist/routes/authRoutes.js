"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const authValidation_1 = require("../validations/authValidation");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/register", authValidation_1.validateRegister, authControllers_1.registerUser);
router.post("/login", authValidation_1.validateLogin, authControllers_1.loginUser);
router.get("/users", authMiddleware_1.isAdmin, authControllers_1.getAllUsers);
// router.get("/profile", authenticateUser, getProfile);
exports.default = router;
