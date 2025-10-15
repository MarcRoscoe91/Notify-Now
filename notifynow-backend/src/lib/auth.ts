 import { Router } from 'express';
 import jwt from 'jsonwebtoken';
 import { z } from 'zod';
 import { sendEmail } from './email.js';
 
 export const authRouter = Router();
 
 const EmailReq = z.object({ email: z.string().email() });
 
+const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days
+
+function cookieOptions(){
+  const appOrigin = process.env.APP_ORIGIN || '';
+  const isLocal = !appOrigin || appOrigin.includes('localhost') || appOrigin.startsWith('http://');
+  const sameSite: 'lax' | 'none' = isLocal ? 'lax' : 'none';
+  const secure = sameSite === 'none' || appOrigin.startsWith('https://');
+  return { httpOnly: true, sameSite, secure, maxAge: COOKIE_MAX_AGE };
+}
+
 function signJwt(payload: any, expSec: number){
   return jwt.sign(payload, process.env.JWT_SECRET!, { algorithm:'HS256', expiresIn: expSec });
 }
 
 function setSessionCookie(res: any, token: string){
-  const secure = !!process.env.APP_ORIGIN && process.env.APP_ORIGIN.startsWith('https');
-  res.cookie('session', token, { httpOnly: true, sameSite:'lax', secure, maxAge: 1000*60*60*24*30 });
+  res.cookie('session', token, cookieOptions());
 }
 
 export async function requireAuth(req: any, res: any, next: any){
   const token = req.cookies?.session || req.headers.authorization?.replace('Bearer ', '');
   if(!token) return res.status(401).json({ error:'Unauthorized' });
   try{
     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
     req.userId = decoded.sub;
     next();
   }catch(e){ return res.status(401).json({ error:'Invalid session' }); }
 }
 
 authRouter.post('/magic-link', async (req, res)=>{
   const { email } = EmailReq.parse(req.body);
   const token = signJwt({ sub: email, typ:'magic' }, 60*30);
-  const url = `${process.env.APP_ORIGIN || 'http://localhost:4000'}/api/auth/callback?token=${token}`;
+  const backendOrigin = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_BACKEND_URL || 'http://localhost:4000';
+  const normalizedBackend = backendOrigin.endsWith('/') ? backendOrigin.slice(0, -1) : backendOrigin;
+  const url = `${normalizedBackend}/api/auth/callback?token=${token}`;
   const html = `<p>Click to sign in to NotifyNow:</p><p><a href="${url}">${url}</a></p><p>This link expires in 30 minutes.</p>`;
   await sendEmail(email, 'Your sign-in link for NotifyNow', html);
   res.json({ ok:true });
 });
 
 authRouter.get('/callback', async (req: any, res: any)=>{
   const token = String(req.query.token || '');
   try{
     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
     const session = signJwt({ sub: decoded.sub, typ:'session' }, 60*60*24*30);
     setSessionCookie(res, session);
     res.send(`<script>window.opener?window.opener.postMessage('notifynow:login:success','*'):null;window.location='/'</script>`);
   }catch(e){ res.status(400).send('Invalid or expired link.'); }
 });
+
+authRouter.get('/me', requireAuth, (req: any, res)=>{
+  res.json({ user: { id: req.userId, email: req.userId } });
+});
+
+authRouter.post('/logout', (_req, res)=>{
+  const { maxAge: _maxAge, ...opts } = cookieOptions();
+  res.clearCookie('session', { ...opts, expires: new Date(0) });
+  res.json({ ok: true });
+});
