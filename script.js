
const tg = window.Telegram.WebApp;
tg.expand();

let cart = {};

function renderCartButton() {
  const btn = document.getElementById('checkout-btn');
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  btn.textContent = `🧾 Оформить заказ (${totalItems})`;
}

function updateCardControls(card, product) {
  const controls = card.querySelector('.controls');
  controls.innerHTML = "";

  const count = cart[product.id] || 0;

  if (count === 0) {
    const addBtn = document.createElement('button');
    addBtn.textContent = "В корзину";
    addBtn.onclick = () => {
      cart[product.id] = 1;
      updateCardControls(card, product);
      renderCartButton();
    };
    controls.appendChild(addBtn);
  } else {
    const minusBtn = document.createElement('button');
    minusBtn.textContent = "➖";
    minusBtn.onclick = () => {
      cart[product.id] -= 1;
      if (cart[product.id] <= 0) delete cart[product.id];
      updateCardControls(card, product);
      renderCartButton();
    };
    const plusBtn = document.createElement('button');
    plusBtn.textContent = "➕";
    plusBtn.onclick = () => {
      cart[product.id] += 1;
      updateCardControls(card, product);
      renderCartButton();
    };
    const countSpan = document.createElement('span');
    countSpan.className = "counter";
    countSpan.textContent = count;

    controls.appendChild(minusBtn);
    controls.appendChild(countSpan);
    controls.appendChild(plusBtn);
  }
}

fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const list = document.getElementById('product-list');
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price} ₽</p>
        <div class="controls"></div>
      `;
      updateCardControls(card, p);
      list.appendChild(card);
    });
  });

document.getElementById('checkout-btn').addEventListener('click', () => {
  const items = [];
  for (let id in cart) {
    const qty = cart[id];
    if (qty > 0) {
      items.push({ id: parseInt(id), qty });
    }
  }
  if (items.length === 0) {
    alert("Корзина пуста!");
    return;
  }

  tg.sendData(JSON.stringify({ type: "order", items }));
  tg.close();
});
