# Проект "Паника"

Домен: _(будет)_   
Публичный IPv4: _(будет)_
 
## Технологии
   
   * Node.js
   * Express.js
   * Postman
   * MongoDB

## Роуты
  
`GET /users/me` - возвращает информацию о пользователе (email и имя)

`GET /articles` - возвращает все сохранённые пользователем статьи

`POST /articles` - создаёт статью с переданными в теле keyword, title, text, date, source, link и image

`DELETE /articles/articleId` - удаляет сохранённую статью  по _id


## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
