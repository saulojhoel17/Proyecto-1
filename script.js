const products = [
  {
    id: 1,
    category: 'novedades',
    name: 'Bolso de Mano en Estructura Rígida',
    price: 1890,
    badge: 'Edición limitada',
    description: 'Una pieza estructurada con una silueta firme, un cierre preciso y una presencia discreta que acompaña con elegancia.',
    benefits: ['Cuero premium con terminación suave', 'Interior acolchado y funcional', 'Cierre magnético discreto'],
    images: ['👜', '✨', '☁️']
  },
  {
    id: 2,
    category: 'novedades',
    name: 'Gafas Cat-Eye Elegantes',
    price: 980,
    badge: 'Línea sculpt',
    description: 'Montura de acetato con forma propuesta para un look sofisticado y femenino, ideal para los días más refinados.',
    benefits: ['Ajuste anatómico', 'Protección UV400', 'Acetato de alto brillo'],
    images: ['🕶️', '🌙', '💫']
  },
  {
    id: 3,
    category: 'esenciales',
    name: 'Blazer de Seda Satinada',
    price: 1640,
    badge: 'Atemporal',
    description: 'Una chaqueta ligera con caída impecable, pensada para elevar cualquier look con una presencia discreta.',
    benefits: ['Textura satinada', 'Corte estructurado', 'Versátil para día y noche'],
    images: ['🧥', '🌿', '✦']
  },
  {
    id: 4,
    category: 'cuidado',
    name: 'Dispositivo de Microcorriente Facial',
    price: 2490,
    badge: 'Recomendado',
    description: 'Tecnología de cuidado facial pensada para una rutina de tratamiento precisa, con una experiencia sensorial refinada.',
    benefits: ['Modo suave y profundo', 'Diseño ergonómico', 'Ideal para piel sensible'],
    images: ['✨', '🫧', '🌸']
  },
  {
    id: 5,
    category: 'cuidado',
    name: 'Aceite de Rosa de Noche',
    price: 760,
    badge: 'Botánica',
    description: 'Una textura ligera y envolvente, creada para aportar confort y luminosidad al ritual nocturno.',
    benefits: ['Con ácido hialurónico', 'Textura sublime', 'Aptos para piel sensible'],
    images: ['🧴', '🌙', '💧']
  }
];

const cart = [];
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');
const productGridEl = document.getElementById('product-grid');
const catalogTitleEl = document.getElementById('catalog-title');
const tabs = document.querySelectorAll('.tab');
const modalEl = document.getElementById('quick-view-modal');
const modalVisualEl = document.getElementById('modal-visual');
const modalThumbnailsEl = document.getElementById('modal-thumbnails');
const modalTitleEl = document.getElementById('modal-title');
const modalDescriptionEl = document.getElementById('modal-description');
const modalBenefitsEl = document.getElementById('modal-benefits');
const modalQuantityEl = document.getElementById('modal-quantity');
const modalAddBtn = document.getElementById('modal-add-btn');
let activeCategory = 'novedades';
let activeModalProductId = null;
let activeModalImageIndex = 0;

function formatPrice(price) {
  return `$${price.toLocaleString('es-MX')}`;
}

function renderProducts() {
  const filteredProducts = products.filter((product) => product.category === activeCategory);
  const activeTab = Array.from(tabs).find((tab) => tab.dataset.category === activeCategory);

  if (activeTab) {
    catalogTitleEl.textContent = activeTab.textContent.trim();
  }

  tabs.forEach((tab) => {
    if (tab.dataset.category === activeCategory) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  productGridEl.classList.add('is-changing');

  window.setTimeout(() => {
    productGridEl.innerHTML = filteredProducts
      .map(
        (product) => `
          <article class="product-card" data-product-id="${product.id}">
            <button class="product-visual" type="button" data-product-id="${product.id}" aria-label="Ver ${product.name}">
              <span>${product.images[0]}</span>
            </button>
            <span class="product-badge">${product.badge}</span>
            <div>
              <h4>${product.name}</h4>
              <p>${product.description}</p>
            </div>
            <div class="product-footer">
              <span>${formatPrice(product.price)}</span>
              <button class="add-btn" type="button" data-product-id="${product.id}">Añadir</button>
            </div>
          </article>
        `
      )
      .join('');

    productGridEl.classList.remove('is-changing');
  }, 180);
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Tu selección aún está vacía.</p>';
    cartCountEl.textContent = '0';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCountEl.textContent = totalItems.toString();
  cartTotalEl.textContent = formatPrice(totalPrice);

  cartItemsEl.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <span>${item.quantity} × ${formatPrice(item.price)}</span>
          </div>
          <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
      `
    )
    .join('');
}

function addToCart(id, quantity = 1) {
  const product = products.find((entry) => entry.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  renderCart();
}

function openModal(productId) {
  const product = products.find((entry) => entry.id === productId);
  if (!product) return;

  activeModalProductId = product.id;
  activeModalImageIndex = 0;
  modalTitleEl.textContent = product.name;
  modalDescriptionEl.textContent = product.description;
  modalBenefitsEl.innerHTML = product.benefits.map((benefit) => `<li>${benefit}</li>`).join('');
  modalVisualEl.textContent = product.images[0];
  modalThumbnailsEl.innerHTML = product.images
    .map(
      (image, index) => `
        <button class="thumbnail-btn ${index === 0 ? 'active' : ''}" type="button" data-index="${index}">
          ${image}
        </button>
      `
    )
    .join('');
  modalEl.classList.remove('hidden');
  modalEl.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modalEl.classList.add('hidden');
  modalEl.setAttribute('aria-hidden', 'true');
}

function renderModalImage(index) {
  const product = products.find((entry) => entry.id === activeModalProductId);
  if (!product) return;

  activeModalImageIndex = index;
  modalVisualEl.textContent = product.images[index];
  Array.from(modalThumbnailsEl.children).forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === index);
  });
}

productGridEl.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-product-id]');
  const card = event.target.closest('.product-card');

  if (!button && !card) return;

  if (button && button.classList.contains('add-btn')) {
    event.stopPropagation();
    addToCart(Number(button.dataset.productId));
    return;
  }

  if (button || card) {
    openModal(Number((button || card).dataset.productId));
  }
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    activeCategory = tab.dataset.category;
    renderProducts();
  });
});

modalThumbnailsEl.addEventListener('click', (event) => {
  const button = event.target.closest('.thumbnail-btn');
  if (!button) return;
  renderModalImage(Number(button.dataset.index));
});

modalAddBtn.addEventListener('click', () => {
  if (activeModalProductId !== null) {
    addToCart(activeModalProductId, Number(modalQuantityEl.value));
    closeModal();
  }
});

document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeModal);
});

document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Selecciona una pieza antes de finalizar la compra.');
  } else {
    alert('¡Gracias por tu compra!');
    cart.length = 0;
    renderCart();
  }
});

renderProducts();
renderCart();
