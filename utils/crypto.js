import crypto from "crypto";

export function generateHashedVerificationCode(length = 6, secretKey) {
  const codeLength = Math.min(Math.max(length, 6), 8);

  let code = "";
  for (let i = 0; i < codeLength; i++) {
    code += Math.floor(Math.random() * 10);
  }

  // Create HMAC hash (string + secret key)
  const hashedCode = crypto.createHmac("sha256", secretKey).update(code).digest("hex");

  return {
    code, // send this to user via email
    hashedCode, // store this in DB
  };
}
