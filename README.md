# movies-explorer-api

В данном репозитории будет реализована backend-часть дипломного проекта.

## Инструкция по запросам (по ТЗ второго этапа):

 Метод запроса | Роут  | Подробное описание
-------------- | ----- | -------------------
GET | /users/me | возвращает информацию о пользователе (email и имя)
PATCH | /users/me | обновляет информацию о пользователе;
GET | /movies | возвращает все сохранённые пользователем фильмы;
POST | /movies | создаёт фильм с переданными в теле данными;
DELETE | /movies/movieId | удаляет сохранённый фильм по _id;
POST | /signup | создаёт пользователя с переданными в теле данными;
POST | /signin | возвращает JWT, если в теле запроса переданы правильные почта и пароль.


### Адрес Backend-проекта:
[https://api-a-trsv-movies.nomoredomains.work/](https://api-a-trsv-movies.nomoredomains.work/)
[http://84.201.176.153:3000/](http://84.201.176.153:3000/)

### Адрес Frontend-проекта (на данный момент не реализован):
[https://a-trsv-movies.nomoredomains.work/](https://a-trsv-movies.nomoredomains.work/)
[https://84.201.176.153/](https://84.201.176.153/)

### Посмотреть план и график реализации дипломной работы:
[https://trello.com/b/DwXNGStr/dimploma-template-plan](https://trello.com/b/DwXNGStr/dimploma-template-plan)
