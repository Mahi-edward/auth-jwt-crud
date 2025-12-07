import crypto from "crypto";

export function generateVerificationCode(length = 6) {
  const codeLength = Math.min(Math.max(length, 6), 8);
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
}


//  Hash the verification code using HMAC-SHA256 + secret key
export function hashVerificationCode(code, secretKey) {
  return crypto
    .createHmac("sha256", secretKey)
    .update(code)
    .digest("hex");
}
