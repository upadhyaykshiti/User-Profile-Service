import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE_THIS_SECRET";
const JWT_EXP = "7d";

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET) as any;
}
