import jwt from "jsonwebtoken";

export const generateToken = (
  id: string,
  email: string,
  expireTime: string = "1d"
) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const payload = { _id: id, email };
  const token = jwt.sign(payload, secretKey, {
    expiresIn: expireTime,
  });
  return token;
};
