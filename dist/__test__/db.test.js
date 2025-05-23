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
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe('Database Connection', () => {
    let sequelize;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const databaseUrl = process.env.TEST_DB;
        if (!databaseUrl) {
            throw new Error("Database URL is not defined");
        }
        sequelize = new sequelize_1.Sequelize(databaseUrl, {
            dialect: 'postgres',
            logging: false
        });
    }));
    it('should successfully connect to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Database connected successfully!');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Close the database connection
        yield sequelize.close();
    }));
});
