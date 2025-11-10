import { Router } from 'express';
import { db } from '../knexdb'; 
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  const { start, end } = req.query;
  const userId = req.user!.id;

  const query = db('audit_logs')
    .where('userId', userId)
    .modify((qb) => {
      if (start) qb.andWhere('createdAt', '>=', start as string);
      if (end) qb.andWhere('createdAt', '<=', end as string);
    })
    .orderBy('createdAt', 'desc');

  const logs = await query;
  return res.json(logs);
});

export default router;
