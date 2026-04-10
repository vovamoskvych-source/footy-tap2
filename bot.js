const TelegramBot = require('node-telegram-bot-api');

const token = '8690035396:AAFfRrjROUl8L6OkQoG6qhqYUYo-IXT3nvY';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id,
        "⚽️ Footy Coin готов!\nНажми LAUNCH чтобы начать игру:",
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "LAUNCH ⚽️",
                            web_app: {
                                url: "https://footyopkiijk.vercel.app/"
                            }
                        }
                    ]
                ]
            }
        }
    );
});

console.log("Bot started...");
