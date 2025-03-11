import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function chat(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是對咖啡知識很了解的人',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return 'error';
  }
}

// 串流回覆模式
async function streamChat(message) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是對咖啡知識很了解的人',
        },
        {
          role: 'user',
          content: message,
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

export const chatController = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const reply = await chat(userMessage);
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing your request' });
  }
}
