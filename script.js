<script>
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, доступен ли объект Telegram
  const tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) {
    alert('⚠️ Telegram WebApp API не обнаружен. Откройте приложение через кнопку в Telegram.');
    return;
  }

  tg.ready();   // уведомляем Telegram, что WebApp инициализирован
  tg.expand();  // разворачиваем окно (опционально)

  // Функция для заказа
  function submitOrder() {
    const payload = {
      type: 'order',
      items: [{ id: 1, qty: 2 }, { id: 3, qty: 1 }]
    };
    tg.sendData(JSON.stringify(payload));
    tg.close(); // закрываем окно
  }

  // Функция для теста
  function sendTest() {
    const payload = {
      type: 'test',
      message: 'Проверка кнопки Тест'
    };
    tg.sendData(JSON.stringify(payload));
    tg.close();
  }

  // Вешаем обработчики кнопок после того, как tg определён
  document.getElementById('orderBtn').onclick = submitOrder;
  document.getElementById('testBtn').onclick = sendTest;
});
</script>
