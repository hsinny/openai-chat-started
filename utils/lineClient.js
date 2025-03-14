import * as line from '@line/bot-sdk';
import dotenv from 'dotenv';

dotenv.config();

// create LINE SDK config
const config = {
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

export {
  line, 
  config, 
  client,
};