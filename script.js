// Скрипт для мини‑магазина Мортадель
// Этот файл инициализирует API Telegram WebApp только после полной загрузки DOM.
// Если приложение открыто вне Telegram, пользователю выводится предупреждение.

document.addEventListener('DOMContentLoaded', () => {
  // Проверяем наличие объекта Telegram.WebApp
  const tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) {
    // В браузере Telegram.WebApp не определён
    alert('⚠️ Telegram WebApp API не обнаружен.\nОткройте приложение через кнопку в Telegram.');
    return;
  }

  // Уведомляем Telegram, что мини‑приложение готово
  try {
    tg.ready();
    tg.expand();
  } catch (e) {
    // В случае возникновения ошибок просто продолжаем
    console.error('Ошибка инициализации Telegram WebApp', e);
  }

  // Находим кнопки
  const orderBtn = document.getElementById('orderBtn');
  const testBtn = document.getElementById('testBtn');

  // Обработчик для оформления заказа
  orderBtn.addEventListener('click', () => {
    const payload = {
      type: 'order',
      items: [
        { id: 1, qty: 2 },
        { id: 3, qty: 1 },
      ],
    };
    try {
      tg.sendData(JSON.stringify(payload));
    } catch (e) {
      console.error('Ошибка отправки заказа', e);
    }
    tg.close();
  });

  // Обработчик для тестовой кнопки
  testBtn.addEventListener('click', () => {
    const payload = {
      type: 'test',
      message: 'Проверка кнопки Тест',
    };
    try {
      tg.sendData(JSON.stringify(payload));
    } catch (e) {
      console.error('Ошибка отправки тестового сообщения', e);
    }
    tg.close();
  });
});