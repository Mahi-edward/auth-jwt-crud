import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } }) // allows all valid TLDs
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a valid email address",
    }),

  password: Joi.string()
    .min(8) // minimum length
    .max(128) // max length
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must not exceed 128 characters",
      "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
    }),
});
