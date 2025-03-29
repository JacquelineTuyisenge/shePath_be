"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ussd_1 = require("../controllers/ussd");
const router = express_1.default.Router();
router.post('/', ussd_1.handleUssdRequest);
exports.default = router;
