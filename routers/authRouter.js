import express from "express";
import {
  signin,
  signup,
  signout,
  sendVerificationCode,
  verifyVerificationCode,
  changePassword,
  sendForgotPasswordCode,
  verifyForgotPassword,
} from "../controllers/authController.js";
import { identification } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.post("/logout", identification, signout);

router.patch("/verification-code", identification, sendVerificationCode);
router.patch("/verification-code/verify", identification, verifyVerificationCode);

router.patch("/password", identification, changePassword);
router.patch("/password/forgot", sendForgotPasswordCode);
router.patch("/password/forgot/verify", verifyForgotPassword);

export default router;
