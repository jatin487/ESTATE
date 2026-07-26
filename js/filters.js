/* ============================================================
   ESTATIA FILTERS & SEARCH MODULE
=============================================================*/
import { agents, propTypes, cities, payments, mapPins } from './data.js';

export function initFilters() {
  const fAgent = document.getElementById('fAgent');
  const fType = document.getElementById('fType');
  const fCity = document.getElementById('fCity');
  const applyBtn = document.getElementById('applyFilters');
  const resetBtn = document.getElementById('resetFilters');

  if (fAgent) agents.forEach(a => { const opt = document.createElement('option'); opt.value = a.name; opt.textContent = a.name; fAgent.appendChild(opt); });
  if (fType) propTypes.forEach(t => { const opt = document.createElement('option'); opt.value = t; opt.textContent = t; fType.appendChild(opt); });
  if (fCity) cities.forEach(c => { const opt = document.createElement('option'); opt.value = c; opt.textContent = c; fCity.appendChild(opt); });

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const agentVal = fAgent ? fAgent.value : '';
      const cityVal = fCity ? fCity.value : '';
      const payVal = document.getElementById('fPayStatus') ? document.getElementById('fPayStatus').value : '';

      // Filter agent leaderboard
      const agentRows = document.querySelectorAll('#agentTbody tr');
      agentRows.forEach(r => {
        const nameEl = r.querySelector('.name');
        if (nameEl) {
          const name = nameEl.textContent;
          r.style.display = (!agentVal || name === agentVal) ? '' : 'none';
        }
      });

      // Filter payment tracker
      const payRows = document.querySelectorAll('#payTbody tr');
      payRows.forEach(r => {
        if (r.children.length >= 7) {
          const status = r.children[6].textContent.trim();
          const prop = r.children[1].textContent;
          const okStatus = !payVal || status === payVal;
          const okCity = !cityVal || prop.includes(cityVal);
          r.style.display = (okStatus && okCity) ? '' : 'none';
        }
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.filterbar select').forEach(s => s.value = '');
      const fDate = document.getElementById('fDate');
      if (fDate) fDate.value = '';
      document.querySelectorAll('#agentTbody tr, #payTbody tr').forEach(r => r.style.display = '');
    });
  }
}

export function initGlobalSearch() {
  const searchInput = document.getElementById('globalSearch');
  const searchResults = document.getElementById('searchResults');
  if (!searchInput || !searchResults) return;

  const searchIndex = [
    ...agents.map(a => ({ type: 'Agent', name: a.name, meta: a.role })),
    ...payments.map(p => ({ type: 'Client', name: p.client, meta: p.property })),
    ...payments.map((p, i) => ({ type: 'Booking ID', name: 'BK-' + (2400 + i), meta: p.client })),
    ...mapPins.map(m => ({ type: 'Property', name: m.city + ' Listings', meta: m.price })),
  ];

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      searchResults.classList.remove('show');
      return;
    }
    const matches = searchIndex.filter(s => s.name.toLowerCase().includes(q) || s.meta.toLowerCase().includes(q)).slice(0, 8);
    searchResults.innerHTML = matches.length
      ? matches.map(m => `<div class="sr-item"><span>${m.name} <small style="margin-left:6px;">${m.meta}</small></span><small>${m.type}</small></div>`).join('')
      : `<div class="sr-empty">No results for "${searchInput.value}"</div>`;
    searchResults.classList.add('show');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) {
      searchResults.classList.remove('show');
    }
  });
}
