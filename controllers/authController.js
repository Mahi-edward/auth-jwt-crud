import { signupSchema } from "../middlewares/validator.js";
import User from "../models/usersModel.js";
import { hashPassword } from "../utils/passwordHelper.js";

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
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
