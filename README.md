# partiibot

Телеграм-бот, разворачиваемый как Netlify Function. Проект реализует простой вебхук, принимает апдейты от Telegram, парсит команды и отвечает в чат. Архитектура предельно минималистична: одна serverless-функция, несколько утилитных модулей и один внешний API (Hashnode) для демонстрационной команды.

## Что делает бот

- Принимает апдейты по вебхуку Netlify Function `update`.
- Парсит текст сообщений на команду, имя бота и дополнительные аргументы.
- Обрабатывает команды через `switch` и отправляет ответ в Telegram через Bot API.
- Имеет пример интеграции с Hashnode (получение списка featured-постов).

Команды по умолчанию:

- `/echo [текст]` — отвечает тем, что вы передали (или `ECHO!`, если аргумент не задан).
- `/hashnodefeatured` — присылает заголовки и авторов первых трёх featured-постов Hashnode и ссылку на список.
- Любая другая команда — отвечает "I don't understand that command."

## Структура и потоки

- `netlify/functions/update.js` — точка входа: принимает `event.body`, достает `message`, выбирает команду и вызывает отправку ответа.
- `messageParts.js` — разбирает текст сообщения на `command`, `botName`, `extra`.
- `sendMessage.js` — обёртка над Telegram Bot API `sendMessage`.
- `hashnode.js` — клиент Hashnode GraphQL (получение featured постов).

Поток данных:

1. Telegram → Netlify Function `update` (webhook).
2. `messageParts` → определение команды.
3. Выполнение команды → `sendMessage` → Telegram.

## Настройка и запуск

1. Задайте токен бота в переменной окружения `TELEGRAM_BOT_TOKEN`.
2. Настройте вебхук Telegram на URL Netlify Function `/.netlify/functions/update`.
3. Деплойте на Netlify (обычный deploy function, без сборки).

Примечание: в `netlify.toml` сейчас используется переменная `BOT_TOKEN`. В коде ожидается `TELEGRAM_BOT_TOKEN`, поэтому при деплое лучше привести их к одному имени.

## Расширение

Добавляйте новые команды в `switch` внутри `netlify/functions/update.js`. Для примера, смотрите реализацию `echo` и `hashnodefeatured`.

## Источники и контекст

Проект создан как минимальный пример для хакатона Netlify x Hashnode (февраль 2022). Описание оригинального решения и подхода — в статье автора.

## License

The MIT License (MIT)

Copyright © 2022 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
