import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/chat', chatRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server running.')
})
