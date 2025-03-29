"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const server_1 = require("./server");
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const courseCategoryRoutes_1 = __importDefault(require("./routes/courseCategoryRoutes"));
const ussdRoutes_1 = __importDefault(require("./routes/ussdRoutes"));
const topicRoutes_1 = __importDefault(require("./routes/topicRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const courseProgressRoute_1 = __importDefault(require("./routes/courseProgressRoute"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
const PORT = process.env.PORT || 10000;
const app = (0, express_1.default)();
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://she-path-front.vercel.app'],
    credentials: true
}));
//use auth routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/roles', roleRoutes_1.default);
app.use('/api/courses', courseRoutes_1.default);
app.use('/api/courseCategories', courseCategoryRoutes_1.default);
app.use('/progress', courseProgressRoute_1.default);
app.use('/ussd', ussdRoutes_1.default);
app.use('/topics', topicRoutes_1.default);
app.use('/comments', commentRoutes_1.default);
app.use('/likes', likeRoutes_1.default);
app.use('/messages', messageRoutes_1.default);
app.use('/chats', chatRoutes_1.default);
// default route
app.get('/', (req, res) => {
    res.send('Welcome to shePath Platform!');
});
// Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});
//start server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, server_1.connectDB)(); //db is to be connected before server start
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}, access it on http://localhost:${PORT}`);
    });
});
startServer();
exports.default = app;
