import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const payload = verifyJwt(token);
    req.user = { id: payload.id, email: payload.email } as any;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
