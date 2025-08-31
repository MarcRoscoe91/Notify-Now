import { Router } from 'express';
import fetch from 'node-fetch';
export const vehicleRouter = Router();

vehicleRouter.get('/lookup', async (req, res)=>{
  const reg = String(req.query.reg || '').replace(/\s+/g,'');
  if(!reg) return res.status(400).json({ error:'Missing reg' });
  const out:any = { reg };

  try{
    const dvsaKey = process.env.DVSA_API_KEY;
    if(dvsaKey){
      const r = await fetch(`https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${encodeURIComponent(reg)}`, {
        headers:{ 'x-api-key': dvsaKey, 'Accept':'application/json' }
      });
      out.dvsa_status = r.status;
      if(r.ok) out.dvsa = await r.json(); else out.dvsa_error = await r.text();
    }
  }catch(e){ out.dvsa_error = String(e); }

  try{
    const dvlaKey = process.env.DVLA_API_KEY;
    if(dvlaKey){
      const r = await fetch("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", {
        method:'POST', headers:{ 'x-api-key': dvlaKey, 'Content-Type':'application/json' },
        body: JSON.stringify({ registrationNumber: reg })
      });
      out.dvla_status = r.status;
      if(r.ok) out.dvla = await r.json(); else out.dvla_error = await r.text();
    }
  }catch(e){ out.dvla_error = String(e); }

  res.json(out);
});
