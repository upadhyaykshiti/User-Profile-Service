// import { Response } from "express";
// import AppDataSource from "../db";
// import { User } from "../entities/User";
// import { AuditLog } from "../entities/AuditLog";
// import { AuthRequest } from "../middleware/authMiddleware";

// export async function getProfile(req: AuthRequest, res: Response) {
//   const userRepo = AppDataSource.getRepository(User);
//   const user = await userRepo.findOneBy({ id: req.user!.id });
//   if (!user) return res.status(404).json({ error: "User not found" });
//   const { password, ...rest } = user as any;
//   return res.json(rest);
// }

// export async function updateProfile(req: AuthRequest, res: Response) {
//   const { firstName, lastName } = req.body;
//   const userId = req.user!.id;

//   await AppDataSource.transaction(async (manager) => {
//     const userRepo = manager.getRepository(User);
//     const auditRepo = manager.getRepository(AuditLog);

//     const user = await userRepo.findOneBy({ id: userId });
//     if (!user) throw new Error("User not found");

//     user.firstName = firstName ?? user.firstName;
//     user.lastName = lastName ?? user.lastName;
//     await userRepo.save(user);

//     await auditRepo.save(auditRepo.create({ userId, action: "PROFILE_UPDATE" }));
//   });

//   return res.json({ message: "Profile updated" });
// }

import { Response } from "express";
import AppDataSource from "../db";
import { User } from "../entities/User";
import { AuditLog } from "../entities/AuditLog";
import { AuthRequest } from "../middleware/authMiddleware";

export async function getProfile(req: AuthRequest, res: Response) {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: req.user!.id });
  if (!user) return res.status(404).json({ error: "User not found" });
  const { password, ...rest } = user as any;
  return res.json(rest);
}

export async function updateProfile(req: AuthRequest, res: Response) {
  const { firstName, lastName } = req.body;
  const userId = req.user!.id;

  try {
    await AppDataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(User);
      const auditRepo = manager.getRepository(AuditLog);

      const user = await userRepo.findOneBy({ id: userId });
      if (!user) throw new Error("User not found");

      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      await userRepo.save(user);

      const auditEntry = auditRepo.create({
        userId,
        action: "PROFILE_UPDATE",
      });
      await auditRepo.save(auditEntry);
    });

    return res.json({ message: "Profile updated successfully" });
  } catch (error: any) {
    console.error("[TRANSACTION ERROR]", error);
    return res.status(500).json({
      error: error.message || "Profile update failed. Changes were rolled back.",
    });
  }
}
