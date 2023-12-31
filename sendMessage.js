const axios = require("axios").default;

module.exports = async (chat_id, text) => {
  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id,
      text,
    }
  );

  return true;
};
