import { Router } from 'express';
import { z } from 'zod';

export const itemsRouter = Router();
const ItemInput = z.object({
  category: z.string(),
  subCategory: z.string().optional(),
  title: z.string().min(2),
  provider: z.string().optional(),
  expiryDate: z.string(),
  status: z.string().optional(),
  reg: z.string().optional(),
});

let memory: any[] = []; // swap to DB (Prisma) in production

itemsRouter.get('/', async (_req: any, res)=>{
  const items = memory.sort((a,b)=> new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
  res.json({ items });
});

itemsRouter.post('/', async (req: any, res)=>{
  const body = ItemInput.parse(req.body);
  const item = { id: String(Date.now())+Math.random().toString(16).slice(2), ...body };
  memory.push(item);
  res.json({ item });
});

itemsRouter.put('/:id', async (req: any, res)=>{
  const body = ItemInput.partial().parse(req.body);
  memory = memory.map(i=> i.id===req.params.id ? { ...i, ...body } : i);
  res.json({ item: memory.find(i=>i.id===req.params.id) });
});

itemsRouter.delete('/:id', async (req: any, res)=>{
  memory = memory.filter(i=> i.id!==req.params.id);
  res.json({ ok:true });
});
