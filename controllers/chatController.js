import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getChatCompletion(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: message,
    });
    return completion.choices?.[0]?.message?.content || '抱歉，我無法回應您的問題。';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return null;
  }
}

// 串流回覆模式
async function streamChat(message) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: message,
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

  if (!userMessage) {
    return res.status(400).json({ error: '請提供訊息' });
  }

  try {
    const message = [
      { role: 'system', content: '' }, 
      { role: 'user', content: userMessage },
    ];

    const reply = await getChatCompletion(message);

    if (reply === null) {
      return res.status(500).json({ error: '無法取得 OpenAI 回應，請稍後再試' });
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '伺服器發生錯誤，請稍後再試' });
  }
}
