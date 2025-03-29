import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const SENDER = process.env.SENDER;

interface Mail {
    to: string;
    subject: string;
    html: any;
}

const sender = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export function sendEMail({ to, subject, html}: Mail) {
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