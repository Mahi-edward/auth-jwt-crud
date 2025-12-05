import JWT from "jsonwebtoken";
import { ENV } from "../config/index.js";
import { ERROR_NAMES } from "../constants/errorNames.js";

export const identification = (req, res, next) => {
  try {
    // Determine token source
    const tokenSource = req.headers.client === "not-browser" ? req.headers.authorization : req.cookies["authorization"];

    if (!tokenSource) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    // Extract token
    const token = tokenSource.startsWith("Bearer ") ? tokenSource.split(" ")[1] : tokenSource;

    // Verify JWT
    const decoded = JWT.verify(token, ENV.token_secret);

    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === ERROR_NAMES.TOKEN_EXPIRED) {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (err.name === ERROR_NAMES.TOKEN_INVALID) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    return res.status(500).json({ success: false, message: "Server error" });
  }
};
