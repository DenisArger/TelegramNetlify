# Memory Bank

## Project Summary

`partiibot` — минималистичный Telegram-бот на Node.js, разворачиваемый как Netlify Function. Бот получает апдейты через вебхук, парсит команды и отвечает в чат. Есть демонстрационная интеграция с Hashnode (featured-посты).

## Core Entry Points

- `netlify/functions/update.js` — единственная serverless-точка входа. Обрабатывает команды, отправляет ответы.

## Key Modules

- `messageParts.js` — парсинг текста на `command`, `botName`, `extra`.
- `sendMessage.js` — отправка сообщений в Telegram Bot API.
- `hashnode.js` — вызов Hashnode GraphQL API для featured-постов.

## Commands

- `/echo [text]` → возвращает `text` или `ECHO!`.
- `/hashnodefeatured` → заголовки и авторы первых трёх featured-постов Hashnode.
- Любая другая команда → "I don't understand that command."

## External Integrations

- Telegram Bot API (`sendMessage`).
- Hashnode GraphQL API (featured posts).

## Configuration

- Ожидается переменная окружения `TELEGRAM_BOT_TOKEN`.
- В `netlify.toml` указан `BOT_TOKEN` — потенциальное несоответствие имени переменной с кодом.

## Deployment Notes

- Webhook должен указывать на `/.netlify/functions/update`.
- Проект не требует сборки и содержит одну функцию.

## Tests

- Тестов нет.

## Risks / Gaps

- Несовпадение имени переменной окружения (`BOT_TOKEN` vs `TELEGRAM_BOT_TOKEN`).
- Нет валидации входящего `event.body` и обработки не-текстовых сообщений.

