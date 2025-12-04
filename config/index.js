export const ENV = {
  port: process.env.PORT,
  mongo_db_url: process.env.MONGO_DB_URI,
  token_secret: process.env.TOKEN_SECRET,
  sender_mail_id: process.env.SENDER_MAIL_ID,
  sender_mail_password: process.env.sender_mail_password,
  verification_secret_key: process.env.VERIFICATION_SECRET_KEY,
  verification_code_expiry_minutes: process.env.VERIFICATION_CODE_EXPIRY_MINUTES || 5,
};
