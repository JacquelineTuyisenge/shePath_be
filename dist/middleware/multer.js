"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Set up multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Use path.join to create an absolute path to the uploads directory
        const uploadPath = path_1.default.join(__dirname, '../../uploads/'); // Adjust the path as necessary
        cb(null, uploadPath); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
