import { client } from '../utils/lineClient.js';
import { getChatCompletion } from '../utils/openAIChatCompletion.js';

export const lineController = (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}

// event handler
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const userMessage = event.message.text.trim();

  if (!userMessage) {
    return Promise.resolve(null);
  }

  try {
    const aiReplyTxt = await getOpenAIChatReply(userMessage);
    const aiReply = { type: 'text', text: aiReplyTxt };

    // use reply API
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [aiReply],
    });
  } catch (err) {
    console.error('Error handling event:', err);
    return Promise.resolve(null);
  }
}

async function getOpenAIChatReply(userMessage) {
  try {
    const message = [
      { role: 'system', content: '' },
      { role: 'user', content: userMessage },
    ];

    const reply = await getChatCompletion(message);
    return reply || '抱歉，我無法回應您的問題，請重新嘗試。';
  } catch (err) {
    console.error('Error getting AI chat completion', err);
    return '抱歉，我無法回應您的問題，請重新嘗試。';
  }
}