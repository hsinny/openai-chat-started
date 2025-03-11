import dotenv from "dotenv";
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import OpenAI from "openai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log('Server running.')
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function chat() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "你是對咖啡知識很了解的人",
        },
        {
          "role": "user",
          "content": "請推薦我一款好喝的單品咖啡，10個字內的簡答"
        },
      ],
    })
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error(error)
  }
}
// chat();

// 串流回覆模式
async function streamChat() {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "你是對咖啡知識很了解的人",
        },
        {
          "role": "user",
          "content": "請推薦我一款好喝的單品咖啡，10個字內的簡答",
        }
      ],
      stream: true, // 啟用串流回覆
    });

    for await (const chunk of stream) {
      console.log(chunk.choices[0]?.delta?.content || '');
    }
  } catch (error) {
    console.error(error)
  }
}
streamChat();