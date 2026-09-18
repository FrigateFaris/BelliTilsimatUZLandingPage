# Подключение заявок с сайта к Google Таблице

Таблица: https://docs.google.com/spreadsheets/d/1Uio5MeSDFzK0pztlPJQ4BvtnAf33Qxl2ASWg13cQRH0/edit?gid=0

Заголовки в таблице уже совпадают с полями формы (Имя, Телефон, Email, Компания, Какой продукт интересует, Сообщение), поэтому маппинг не нужен — просто добавляем строку 1-в-1.

## Шаг 1. Открыть редактор скриптов

В самой таблице: **Extensions → Apps Script** (Расширения → Apps Script). Откроется новая вкладка с редактором кода, уже привязанным к этой таблице.

## Шаг 2. Вставить код

Удалите всё содержимое файла `Code.gs` и вставьте:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.openById('1Uio5MeSDFzK0pztlPJQ4BvtnAf33Qxl2ASWg13cQRH0').getSheets()[0];
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.name || '',
    data.phone || '',
    data.email || '',
    data.company || '',
    data.product || '',
    data.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Сохраните (значок дискеты или Ctrl+S). Название проекта можно оставить любым, например «Belli Tilsimat — заявки».

## Шаг 3. Задеплоить как веб-приложение

1. Кнопка **Deploy → New deployment** (Развернуть → Новое развёртывание) в правом верхнем углу.
2. Рядом с «Select type» нажмите на шестерёнку ⚙️ и выберите **Web app**.
3. Настройки:
   - **Execute as**: Me (ваш аккаунт)
   - **Who has access**: Anyone (важно — иначе сайт не сможет достучаться до скрипта)
4. **Deploy**.
5. Google попросит авторизовать доступ скрипта к вашей таблице — это нормально, разрешите (Advanced → Go to [project name] (unsafe), если предупреждение о непроверенном приложении — это стандартно для собственных скриптов).
6. После деплоя появится **Web app URL** вида:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
   Скопируйте эту ссылку целиком.

## Шаг 4. Передать ссылку

Пришлите эту ссылку — я вставлю её в `script.js` (переменная `SHEET_WEBHOOK_URL` в начале файла) вместо `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE`, и заявки с сайта начнут автоматически появляться строками в таблице.

## Важно на будущее

Если понадобится **изменить код скрипта** (например, добавить новое поле), после правок нужно заново сделать **Deploy → Manage deployments → Edit (карандаш) → New version → Deploy** — простое сохранение файла в редакторе не обновляет уже работающий веб-адрес.

## Проверка

После того как ссылка будет вставлена и сайт запушен, можно отправить тестовую заявку через форму на сайте и убедиться, что строка появилась в таблице.
