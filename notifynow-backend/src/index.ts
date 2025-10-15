import cors from 'cors';
app.use(cors({
  origin: ['https://notify-now.co.uk', 'https://www.notify-now.co.uk'],
  credentials: true
}));
