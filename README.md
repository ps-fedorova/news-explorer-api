# News Exploer API

Проект представляет собой API для аутентификации пользователей и сохранения статей.

Домен бэкенда: https://XXXXX.students.nomoreparties.xyz   
Публичный IPv4: 178.154.225.241
 
## Технологии
   
   * Node.js
   * Express.js
   * Postman
   * MongoDB

## Роуты 

[`POST /signup`](#Регистрация) -  создаёт пользователя с переданными в теле email, password и name

[`POST /signin`](#Авторизация)  - проверяет переданные в теле почту и пароль и возвращает JWT

[`GET /users/me`](#Получить-информацию-о-пользователе) - возвращает информацию о пользователе (email и имя)

[`GET /articles`](#Получить-все-сохраненные-статьи) - возвращает все сохранённые пользователем статьи

[`POST /articles`](#Создать-статью) - создаёт статью с переданными в теле keyword, title, text, date, source, link и image

[`DELETE /articles/:articleId`](#Удалить-статью) - удаляет сохранённую статью  по _id

## Запуск проекта

Для работы с проектом вам понадобятся git, NodeJS, MongoDB, Postman. Установить программное обеспечение можно по следующим ссылкам:

* [Скачать git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Скачать NodeJS](https://nodejs.org/en/download/package-manager/)
* [Скачать MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
* [Скачать Postman](https://www.postman.com/downloads/)

## Локальная установка

1. git clone https://github.com/ps-fedorova/news-explorer-api.git
2. cd news-explorer-api
3. npm i

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

Локальный сервер доступен по адресу http://localhost:3000.

## Методы REST API 
(роуты приведены для тестирования проекта на локальном сервере)

### **Регистрация** 
POST http://localhost:3000/signup

пример тела запроса:
```
{
  "email": "mail@mail.com",
  "password": "password",
  "name": "Sailor Moon"
}
```
ответы:

1. Регистрация прошла успешно - `status 201`

```
{
    "_id": "5f89a2323ae2a023d0669b13",
    "email": "mail@l.com",
    "name": "Sailor Moon"
}
```

2. Пользователя уже существующей в базе - `status 409`
```
{
    "message": "Пользователь с таким email уже зарегистрирован"
}
```
3. Данные переданы некорректно (возможный пример ответа) - `status 400` 

```{
    "message": "Поле «name» обязательное. «email» - некорректный email. Поле «password» не должно содержать пробелов. Минимальное количество символов в поле «password»: 8"
}
```
### **Авторизация** 
POST http://localhost:3000/signup

пример тела запроса:
```
{
  "email": "mail@mail.com",
  "password": "password"
}
```
ответы:

1. Авторизация прошла успешно - `status 200`

```
{
    "message": "Авторизация прошла успешно"
}
```
2. Данные переданы некорректно (возможный пример ответа) - `status 400` 

```{
    "message": "«mail@mail» - некорректный email. Минимальное количество символов в поле «password»: 8. Поле «name» лишнее"
}
```

3. Пользователя нет в базе - `status 401` 

```
{
    "message": "Неправильные почта или пароль"
}
```
### **Получить информацию о пользователе**
GET http://localhost:3000/users/me

ответы:

1. Данные о пользователе - `status 200`
```
{
    "name": "Sailor Moon",
    "email": "mail@mail.com"
}
```

2. Не пройдена процедура авторизации - `status 403`
```
{
    "message": "Требуется авторизация"
}
```
### **Получить свои сохраненные статьи**
GET http://localhost:3000/articles

ответы:

1. Массив с данными формата JSON - `status 200`

2. Не пройдена процедура авторизации - `status 403`
```
{
    "message": "Недостаточно прав для выполнения операции"
}
```
### **Создать статью**
POST http://localhost:3000/articles

пример тела запроса:
```
{
  "keyword": "keyword",
  "title": "title",
  "text": "text",
  "date": "date",
  "source": "source",
  "link": "https://test.jpg",
  "image": "https://test.jpg"
}

```
ответы:
1. Статья добавлена успешно - `status 201`

```{
    "data": {
        "_id": "5f89bb1e1e24a53244733dc9",
        "keyword": "keyword",
        "title": "title",
        "text": "text",
        "date": "date",
        "source": "source",
        "link": "https://test.jpg",
        "image": "https://test.jpg",
        "owner": "5f885f170d1c1e19548882be",
        "__v": 0
    }
}
```
2. Данные переданы некорректно (возможный пример ответа) - `status 400` 

```{
    "message": "Поле «date» обязательное. «https.jpg» - некорректный URL. Поле «image» обязательное. Поле «qwerty» лишнее"
}
```
3. Не пройдена процедура авторизации - `status 403`
```
{
    "message": "Недостаточно прав для выполнения операции"
}
```

### **Удалить статью**
DELETE http://localhost:3000/articles/:articleId

1. Статья удалена - `status 200`

```
{
    "message": "Пост успешно удален"
}
```
2. Попытка удалить статью другого пользователя - `status 403`
```
{
    "message": "Недостаточно прав для выполнения операции"
}
```
3. Данные переданы некорректно (возможный пример ответа) - `status 400` 

```
{
    "message": "Требуемое количество символов в поле «articleId»: 24. Поле «articleId» должно быть представлено в виде шестнадцатеричной записи (Hex)"
}
```
