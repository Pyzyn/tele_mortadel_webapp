let tg = window.Telegram.WebApp;

if (!tg) {
  alert("⚠️ Telegram WebApp не обнаружен. Откройте через Telegram.");
}

tg.expand();

function submitOrder() {
  const payload = {
    type: "order",
    items: [{ id: 1, qty: 2 }, { id: 3, qty: 1 }]
  };
  tg.sendData(JSON.stringify(payload));
  tg.close();
}

function sendTest() {
  const payload = {
    type: "test",
    message: "Проверка кнопки Тест"
  };
  tg.sendData(JSON.stringify(payload));
  tg.close();
}