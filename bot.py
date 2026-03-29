from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

TOKEN = "8690035396:AAFfRrjROUl8L6OkQoG6qhqYUYo-IXT3nvY"
WEBAPP_URL = "https://footy-tap.vercel.app"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("🚀 LAUNCH FOOTY TAP", web_app=WebAppInfo(url=WEBAPP_URL))]
    ]

    await update.message.reply_text(
        "⚽️ Footy Tap готов!",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

app = Application.builder().token(TOKEN).build()
app.add_handler(CommandHandler("start", start))

print("Bot running...")
app.run_polling()
