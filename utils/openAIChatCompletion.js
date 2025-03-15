import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getChatCompletion(message) {
  if (!message) return null;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: message,
    });
    return completion.choices?.[0]?.message?.content || '抱歉，我無法回應您的問題，請重新嘗試。';
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