import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import chatRoutes from './routes/chatRoutes.js';
import lineRoutes from './routes/lineRoutes.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    if (req.originalUrl.startsWith("/api/webhook/line")) {
      req.rawBody = buf.toString(); // 保留原始 body，讓 LINE middleware signature 驗證成功
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/chat', chatRoutes);
app.use('/api/webhook/line', lineRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server running.')
})
