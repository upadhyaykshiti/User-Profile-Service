import { Request, Response } from "express";
import AppDataSource from "../db";
import { User } from "../entities/User";
import { AuditLog } from "../entities/AuditLog";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";

const SALT_ROUNDS = 12;

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  const repo = AppDataSource.getRepository(User);
  const existing = await repo.findOneBy({ email });
  if (existing) return res.status(409).json({ error: "Email already in use" });

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = repo.create({ email, password: hashed, firstName, lastName });
  await repo.save(user);
  return res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signJwt({ id: user.id, email: user.email });

  const auditRepo = AppDataSource.getRepository(AuditLog);
  await auditRepo.save(auditRepo.create({ userId: user.id, action: "LOGIN_SUCCESS" }));

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // return res.json({ message: "Logged in" });
  return res.json({
    message: "Logged in successfully",
    token,
    user: { id: user.id, email: user.email },
  });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
}
