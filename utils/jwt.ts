import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

type UserInfo = {
  id: string;
  username: string;
};

export function signJWT(payload: UserInfo) {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: "2d",
  });
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET!) as UserInfo;
  } catch (error) {
    return null;
  }
}