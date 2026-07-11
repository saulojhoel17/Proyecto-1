// Quiet Luxury storefront behavior
// Note: This file is a theme asset and expects DOM nodes inside the section

const QL_products = [
  { id: 1, category: 'novedades', name: 'Bolso de Mano en Estructura Rígida', price: 1890, badge: 'Edición limitada', description: 'Una pieza estructurada con una silueta firme, un cierre preciso y una presencia discreta que acompaña con elegancia.', benefits: ['Cuero de alta calidad', 'Interior acolchado', 'Cierre magnético'], images: ['1','2','3'] },
  { id: 2, category: 'novedades', name: 'Gafas Cat-Eye Elegantes', price: 980, badge: 'Línea sculpt', description: 'Montura de acetato con forma propuesta para un look sofisticado y femenino.', benefits: ['Ajuste anatómico','Protección UV400'], images: ['1','2'] },
  { id: 3, category: 'esenciales', name: 'Blazer de Seda Satinada', price: 1640, badge: 'Atemporal', description: 'Chaqueta ligera con caída impecable.', benefits: ['Textura satinada','Corte estructurado'], images: ['1'] },
  { id: 4, category: 'cuidado', name: 'Dispositivo de Microcorriente Facial', price: 2490, badge: 'Recomendado', description: 'Tecnología para una rutina de tratamiento precisa.', benefits: ['Modo suave y profundo','Diseño ergonómico'], images: ['1'] },
  { id: 5, category: 'cuidado', name: 'Aceite de Rosa de Noche', price: 760, badge: 'Botánica', description: 'Textura ligera y envolvente para el ritual nocturno.', benefits: ['Con ácido hialurónico','Textura sublime'], images: ['1'] }
];

function QL_formatPrice(price) { return '$' + price.toLocaleString('es-MX'); }

function QL_init(section) {
  const productGrid = section.querySelector('.quiet-grid');
  const tabs = section.querySelectorAll('.quiet-tab');
  const catalogTitle = section.querySelector('.quiet-catalog-title');
  let active = 'novedades';

  function render() {
    const filtered = QL_products.filter(p => p.category === active);
    catalogTitle.textContent = active.charAt(0).toUpperCase() + active.slice(1);
    productGrid.innerHTML = filtered.map(p => `
      <article class="quiet-card" data-id="${p.id}">
        <button class="quiet-visual" type="button" aria-label="Ver ${p.name}"></button>
        <div>
          <span class="quiet-badge">${p.badge}</span>
          <h4>${p.name}</h4>
          <p>${p.description}</p>
        </div>
        <div class="quiet-footer">
          <span>${QL_formatPrice(p.price)}</span>
          <button class="quiet-add" data-id="${p.id}">Añadir</button>
        </div>
      </article>
    `).join('');
  }

  productGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.quiet-card');
    if (!card) return;
    const id = Number(card.dataset.id);
    // open modal or handle add - simplified: alert for preview
    if (e.target.classList.contains('quiet-add')) {
      alert('Añadido al carrito: ' + card.querySelector('h4').textContent);
    } else {
      // open simple modal
      const modal = section.querySelector('.quiet-modal');
      modal.querySelector('.quiet-modal-title').textContent = card.querySelector('h4').textContent;
      modal.classList.remove('hidden');
    }
  });

  tabs.forEach(tab => tab.addEventListener('click', () => { active = tab.dataset_category || tab.datasetCategory || tab.getAttribute('data-category'); render(); }));

  // close modal
  section.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => {
    section.querySelector('.quiet-modal').classList.add('hidden');
  }));

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.quiet-luxury-section').forEach(QL_init);
});
