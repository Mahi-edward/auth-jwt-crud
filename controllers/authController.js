import { ENV } from "../config/index.js";
import { signinSchema, signupSchema } from "../middlewares/validator.js";
import User from "../models/usersModel.js";
import { comparePassword, hashPassword } from "../utils/passwordHelper.js";
import JWT from "jsonwebtoken";
import { sendResponse } from "../utils/responseHelper.js";
export const signup = async (req, res) => {
  try {
    const { email, password } = await signupSchema.validateAsync(req.body);

    // check user already exist or not
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already created!" });
    }

    // hash the user password
    const hashedPassword = await hashPassword(password);

    // create new user
    const newUser = await User.create({ email, password: hashedPassword });
    newUser.password = undefined;
    res.status(201).json({ success: true, message: "User created successfully!", data: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = await signinSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isValidPassword = await comparePassword(password, existingUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = JWT.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      ENV.token_secret
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 1 * 60000),
    };

    res
      .status(200)
      .cookie("Authorization", "Bearer " + token, cookieOptions)
      .json({
        success: true,
        token,
        message: "Logged in successfully",
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// TODO: signout functionality
export const signout = (req, res) => {
  try {
    res.status(200).clearCookie("Authorization").json({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
