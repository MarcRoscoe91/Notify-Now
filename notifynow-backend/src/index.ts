app.get('/', (_req, res) => {
  res.json({ ok: true, name: 'notifynow-backend' });
});
app.head('/', (_req, res) => res.sendStatus(200));
