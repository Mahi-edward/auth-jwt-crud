// import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email Id required!"],
      unique: [true, "Email Id must be unique!"],
      minLength: [5, "Email Id must be at least 5 characters!"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided!"],
      select: false,
      trim: true,
    },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, select: false },
    verificationCodeExpiresAt: { type: Date, select: false },
    forgotPasswordCode: { type: String, select: false },
    forgotPasswordExpiresAt: { type: Date, select: false },
  },
  { timestamps: true }
);

export default model("User", userSchema);
