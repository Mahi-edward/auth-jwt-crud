import nodemailer from "nodemailer";
import { ENV } from "../config/index.js";

export const mailTransporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.sender_mail_id,
    pass: ENV.sender_mail_password,
  },
});
