import { getChatCompletion } from "../utils/openAIChatCompletion.js";

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
