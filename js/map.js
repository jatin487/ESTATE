/* ============================================================
   ESTATIA INTERACTIVE MAP MODULE
=============================================================*/
import { mapPins } from './data.js';

export function initMap() {
  const mapCanvas = document.getElementById('mapCanvas');
  const mapFilterBtns = document.getElementById('mapFilterBtns');
  if (!mapCanvas) return;

  function renderPins(filter) {
    mapCanvas.querySelectorAll('.pin').forEach(p => p.remove());
    mapPins.filter(p => !filter || p.type === filter).forEach(p => {
      const pin = document.createElement('div');
      pin.className = `pin ${p.type}`;
      pin.style.top = p.top;
      pin.style.left = p.left;
      pin.innerHTML = `<div class="pin-tooltip"><b>${p.city}</b><br>${p.price} · ${p.type}</div>`;
      mapCanvas.appendChild(pin);
    });
  }

  renderPins(null);

  const mapFilters = [
    { k: null, l: 'All' },
    { k: 'available', l: 'Available' },
    { k: 'sold', l: 'Sold' },
    { k: 'premium', l: 'Premium' },
    { k: 'hot', l: 'Hot Selling' }
  ];

  if (mapFilterBtns) {
    mapFilterBtns.innerHTML = mapFilters.map((f, i) =>
      `<button class="export-btn map-f" data-k="${f.k || ''}" style="${i === 0 ? 'border-color:var(--gold); color:var(--gold-deep);' : ''}">${f.l}</button>`
    ).join('');

    mapFilterBtns.querySelectorAll('.map-f').forEach(btn => {
      btn.addEventListener('click', () => {
        mapFilterBtns.querySelectorAll('.map-f').forEach(b => {
          b.style.borderColor = '';
          b.style.color = '';
        });
        btn.style.borderColor = 'var(--gold)';
        btn.style.color = 'var(--gold-deep)';
        renderPins(btn.dataset.k || null);
      });
    });
  }
}
