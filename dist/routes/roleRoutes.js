"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controllers/roleController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/all", authMiddleware_1.isAdmin, roleController_1.allRoles);
router.post("/new", authMiddleware_1.isAdmin, roleController_1.createRole);
router.patch("/assign/:userId", authMiddleware_1.isAdmin, roleController_1.assignRole);
router.patch("/update/:id", authMiddleware_1.isAdmin, roleController_1.updateRole);
router.delete("/delete/:id", authMiddleware_1.isAdmin, roleController_1.deleteRole);
exports.default = router;
