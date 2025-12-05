import express from "express";
import {
  signin,
  signup,
  signout,
  sendVerificationCode,
  verifyVerificationCode,
} from "../controllers/authController.js";
import { identification } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", identification, signout);
router.patch("/send-verification-code", identification, sendVerificationCode);
router.patch("/verify-verification-code", identification, verifyVerificationCode);

export default router;
