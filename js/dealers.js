/* ============================================================
   ESTATIA DEALERS & PROPERTIES MANAGEMENT MODULE
=============================================================*/
import { agents, properties, addDealer, addProperty, fmtCr } from './data.js';
import { showToast } from './realtime.js';

export function initDealerManagement(refreshCallbacks = {}) {
  setupModals();
  populateDealerDropdown();
  setupDealerFormSubmit(refreshCallbacks);
  setupPropertyFormSubmit(refreshCallbacks);
  renderDealerOverviewCards();
}

function setupModals() {
  // Open Add Dealer Modal
  const openDealerBtn = document.getElementById('openAddDealerModal');
  const dealerModal = document.getElementById('addDealerModal');
  const closeDealerBtn = document.getElementById('closeAddDealerModal');
  const cancelDealerBtn = document.getElementById('cancelAddDealerModal');

  if (openDealerBtn && dealerModal) {
    openDealerBtn.addEventListener('click', () => {
      dealerModal.classList.add('show');
    });
  }

  [closeDealerBtn, cancelDealerBtn].forEach(btn => {
    if (btn && dealerModal) {
      btn.addEventListener('click', () => dealerModal.classList.remove('show'));
    }
  });

  // Open Add Property Modal
  const openPropBtn = document.getElementById('openAddPropertyModal');
  const propModal = document.getElementById('addPropertyModal');
  const closePropBtn = document.getElementById('closeAddPropertyModal');
  const cancelPropBtn = document.getElementById('cancelAddPropertyModal');

  if (openPropBtn && propModal) {
    openPropBtn.addEventListener('click', () => {
      populateDealerDropdown();
      propModal.classList.add('show');
    });
  }

  [closePropBtn, cancelPropBtn].forEach(btn => {
    if (btn && propModal) {
      btn.addEventListener('click', () => propModal.classList.remove('show'));
    }
  });

  // Close modals on clicking backdrop
  window.addEventListener('click', (e) => {
    if (dealerModal && e.target === dealerModal) dealerModal.classList.remove('show');
    if (propModal && e.target === propModal) propModal.classList.remove('show');
  });
}

export function populateDealerDropdown() {
  const select = document.getElementById('propDealer');
  const filterAgentSelect = document.getElementById('fAgent');
  
  if (select) {
    select.innerHTML = agents.map(a => `<option value="${a.name}">${a.name} (${a.role} · ${a.propertiesCount || 0} props)</option>`).join('');
  }

  if (filterAgentSelect) {
    const currentVal = filterAgentSelect.value;
    filterAgentSelect.innerHTML = `<option value="">All Agents / Dealers</option>` + 
      agents.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
    filterAgentSelect.value = currentVal;
  }
}

function setupDealerFormSubmit(callbacks) {
  const form = document.getElementById('addDealerForm');
  const modal = document.getElementById('addDealerModal');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('dealerName').value.trim();
    const role = document.getElementById('dealerRole').value;
    const email = document.getElementById('dealerEmail').value.trim();
    const phone = document.getElementById('dealerPhone').value.trim();
    const city = document.getElementById('dealerCity').value;
    const target = parseFloat(document.getElementById('dealerTarget').value || 75);
    const initialProps = parseInt(document.getElementById('dealerProps').value || 0);

    if (!name) return;

    const newDealer = addDealer({
      name,
      role,
      email,
      phone,
      city,
      target,
      propertiesCount: initialProps,
      revenue: parseFloat((initialProps * 0.4).toFixed(1)),
      commission: parseFloat((initialProps * 0.02).toFixed(2)),
      deals: Math.floor(initialProps * 0.6),
      leads: Math.floor(initialProps * 2.5)
    });

    if (modal) modal.classList.remove('show');
    form.reset();

    showToast("Dealer Added Successfully!", `${newDealer.name} (${newDealer.role}) added to network`, "🤝");

    // Trigger full app refresh callbacks
    if (callbacks.onDealerAdded) callbacks.onDealerAdded();
    populateDealerDropdown();
    renderDealerOverviewCards();
  });
}

function setupPropertyFormSubmit(callbacks) {
  const form = document.getElementById('addPropertyForm');
  const modal = document.getElementById('addPropertyModal');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('propTitle').value.trim();
    const type = document.getElementById('propType').value;
    const city = document.getElementById('propCity').value;
    const price = parseFloat(document.getElementById('propPrice').value || 1.5);
    const sqft = parseInt(document.getElementById('propSqft').value || 1500);
    const dealerName = document.getElementById('propDealer').value;
    const status = document.getElementById('propStatus').value;
    const category = document.getElementById('propCategory').value;

    if (!title) return;

    const newProp = addProperty({
      title,
      type,
      city,
      price,
      sqft,
      dealerName,
      status,
      category
    });

    if (modal) modal.classList.remove('show');
    form.reset();

    showToast("Property Added!", `${newProp.title} assigned to ${newProp.dealerName}`, "🏡");

    // Trigger full app refresh callbacks
    if (callbacks.onPropertyAdded) callbacks.onPropertyAdded();
    renderDealerOverviewCards();
  });
}

export function renderDealerOverviewCards() {
  const container = document.getElementById('dealerSummaryContainer');
  if (!container) return;

  const totalDealers = agents.length;
  const totalProps = properties.length + 632;
  const avgPropsPerDealer = Math.round(totalProps / (totalDealers || 1));
  const activeDealers = agents.filter(a => a.deals > 0).length;

  container.innerHTML = `
    <div class="card dealer-summary-card">
      <div class="dsc-head">
        <div>
          <div class="eyebrow">Dealer &amp; Inventory Hub</div>
          <h3 class="dsc-title">Dealer Network &amp; Property Allocations</h3>
          <div class="dsc-sub">Manage real estate agents, track assigned properties, and expand portfolio.</div>
        </div>
        <div class="dsc-actions">
          <button class="btn-gold" id="openAddDealerModalBtn">+ Add New Dealer</button>
          <button class="btn-ghost" id="openAddPropertyModalBtn" style="border-color:var(--gold); color:var(--gold-deep);">+ Add Property</button>
        </div>
      </div>

      <div class="dsc-stats">
        <div class="dsc-stat-item">
          <div class="v">${totalDealers}</div>
          <div class="l">Active Dealers</div>
        </div>
        <div class="dsc-stat-item">
          <div class="v">${totalProps}</div>
          <div class="l">Total Properties</div>
        </div>
        <div class="dsc-stat-item">
          <div class="v">${avgPropsPerDealer}</div>
          <div class="l">Avg Props / Dealer</div>
        </div>
        <div class="dsc-stat-item">
          <div class="v">${activeDealers}</div>
          <div class="l">Top Performing Dealers</div>
        </div>
      </div>
    </div>
  `;

  // Attach button triggers inside newly rendered card
  document.getElementById('openAddDealerModalBtn')?.addEventListener('click', () => {
    document.getElementById('addDealerModal')?.classList.add('show');
  });

  document.getElementById('openAddPropertyModalBtn')?.addEventListener('click', () => {
    populateDealerDropdown();
    document.getElementById('addPropertyModal')?.classList.add('show');
  });
}
