"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEMail = sendEMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const SENDER = process.env.SENDER;
const sender = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
function sendEMail({ to, subject, html }) {
    console.log("EMAIL:", process.env.EMAIL);
    console.log("PASS:", process.env.PASS ? "Loaded" : "Missing");
    const mail = {
        from: `"${SENDER}" <${EMAIL}>`,
        to,
        subject,
        html,
    };
    sender.sendMail(mail, (error) => {
        if (error) {
            console.log("Sending Email Failed", error);
        }
    });
}
