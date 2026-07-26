/* ============================================================
   ESTATIA MAIN APPLICATION MODULE ENTRY POINT
=============================================================*/
import {
  agents, kpis, icons, notifData, tickerData, leadStatsData,
  funnelStages, followUps, invData, revStatsData, payments,
  custStatsData, sources, activities, fmtCr
} from './data.js';
import { initTheme } from './theme.js';
import { initCharts, refreshChartColors } from './charts.js';
import { initFilters, initGlobalSearch } from './filters.js';
import { initMap } from './map.js';
import { initAuth } from './auth.js';
import { initRealtimeEngine } from './realtime.js';
import { initDealerManagement, renderDealerOverviewCards, populateDealerDropdown } from './dealers.js';
import './export.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme with Chart refresher callback
  initTheme(() => {
    refreshChartColors();
  });

  // Initialize Authentication & Supabase state
  initAuth();

  // Initialize Real-time updates engine (clock, simulation loop, toasts)
  initRealtimeEngine();

  // Initialize Dealer & Property Management Hub
  initDealerManagement({
    onDealerAdded: () => refreshAppViews(),
    onPropertyAdded: () => refreshAppViews()
  });

  // Render Mobile Drawer Navigation
  setupMobileNavigation();

  // Render Notifications
  renderNotifications();

  // Render Ticker
  renderTicker();

  // Render KPIs
  renderKPIs();

  // Render Lead Stats & Funnel & Follow-ups
  renderLeadManagement();

  // Render Property Inventory
  renderInventory();

  // Render Agent Leaderboard
  renderAgentLeaderboard();

  // Render Revenue Stats
  renderRevenueStats();

  // Render Payment Tracker
  renderPaymentTracker();

  // Render Customer Stats & Sources
  renderCustomerAnalytics();

  // Render Activity Timeline
  renderActivityTimeline();

  // Initialize Interactive Map
  initMap();

  // Initialize Charts
  initCharts();

  // Initialize Search & Filter Bar
  initFilters();
  initGlobalSearch();

  // Setup Sidebar Navigation Smooth Scroll & Section Toggling
  setupNavigation();
});

function refreshAppViews() {
  renderKPIs();
  renderInventory();
  renderAgentLeaderboard();
  renderDealerOverviewCards();
  populateDealerDropdown();
}

/* ============================================================
   MOBILE DRAWER NAVIGATION
=============================================================*/
function setupMobileNavigation() {
  const mobileNavBtn = document.getElementById('mobileNavBtn');
  const overlay = document.getElementById('mobileNavOverlay');
  const shell = document.querySelector('.shell');

  if (mobileNavBtn && shell) {
    mobileNavBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      shell.classList.toggle('mobile-open');
      if (overlay) overlay.classList.toggle('show');
    });
  }

  if (overlay && shell) {
    overlay.addEventListener('click', () => {
      shell.classList.remove('mobile-open');
      overlay.classList.remove('show');
    });
  }
}

/* ============================================================
   DOM RENDERERS
=============================================================*/

function renderNotifications() {
  const notifPanel = document.getElementById('notifPanel');
  const notifBtn = document.getElementById('notifBtn');
  if (!notifPanel || !notifBtn) return;

  const notifColors = { amber: "#C6A143", red: "#C24A3C", blue: "#3E6FA6", gold: "#9C7C24", green: "#1A7A4C" };
  notifPanel.innerHTML = `<div class="notif-head">Notifications <span>${notifData.length} new</span></div><div class="notif-list">${
    notifData.map(n => `<div class="notif-row"><div class="notif-ico" style="background:${notifColors[n.c]}22;">${n.i}</div><div><div class="notif-title">${n.t}</div><div class="notif-sub">${n.s}</div></div></div>`).join('')
  }</div>`;

  notifBtn.addEventListener('click', e => {
    e.stopPropagation();
    notifPanel.classList.toggle('show');
  });

  document.addEventListener('click', () => notifPanel.classList.remove('show'));
}

function renderTicker() {
  const tickerTrack = document.getElementById('tickerTrack');
  if (!tickerTrack) return;
  const tickerHTML = tickerData.map(t =>
    `<span class="ticker-item"><span class="ticker-label">${t.l}</span><b>${t.v}</b><span class="${t.up ? 'up' : 'down'}">${t.up ? '▲' : '▼'} ${t.d}</span></span>`
  ).join('');
  tickerTrack.innerHTML = tickerHTML + tickerHTML;
}

function renderKPIs() {
  const kpiGrid = document.getElementById('kpiGrid');
  if (!kpiGrid) return;
  kpiGrid.innerHTML = '';
  kpis.forEach((k, idx) => {
    const card = document.createElement('div');
    card.className = 'card kpi-card reveal';
    card.style.animationDelay = (idx * 0.04) + 's';
    card.innerHTML = `
      <div class="kpi-top">
        <div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${icons[k.icon]}</svg></div>
        <div class="kpi-trend ${k.up ? 'up' : 'down'}">${k.up ? '▲' : '▼'} ${k.trend}</div>
      </div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-label">${k.label}</div>`;
    kpiGrid.appendChild(card);
  });
}

function renderLeadManagement() {
  const leadStats = document.getElementById('leadStats');
  if (leadStats) {
    leadStats.innerHTML = leadStatsData.map(s => `<div class="card stat-pill"><div class="v">${s.v}</div><div class="l">${s.l}</div></div>`).join('');
  }

  const funnelBody = document.getElementById('funnelBody');
  if (funnelBody) {
    const maxF = funnelStages[0].count;
    funnelBody.innerHTML = funnelStages.map(f => `
      <div class="funnel-stage">
        <div class="funnel-name">${f.name}</div>
        <div class="funnel-bar-outer"><div class="funnel-bar" style="width:${(f.count / maxF * 100)}%">${((f.count / maxF) * 100).toFixed(0)}%</div></div>
        <div class="funnel-count">${f.count}</div>
      </div>`).join('');
  }

  const followBody = document.getElementById('followBody');
  if (followBody) {
    followBody.innerHTML = followUps.map(f => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-radius:12px; background:var(--green-soft);">
        <div><div style="font-weight:600; font-size:12.5px;">${f.n}</div><div style="font-size:11px; color:var(--text-400);">${f.t}</div></div>
        <div style="font-size:11px; font-family:var(--font-mono); color:var(--gold-deep); white-space:nowrap;">${f.time}</div>
      </div>`).join('');
  }
}

function renderInventory() {
  const invGrid = document.getElementById('invGrid');
  if (!invGrid) return;
  invGrid.innerHTML = invData.map(i => `
    <div class="card inv-card"><div class="v">${i.v}</div><div class="l">${i.l}</div><div class="bar"><i style="width:${i.p}%"></i></div></div>`).join('');
}

let agentSort = { k: 'revenue', dir: -1 };

function renderAgentLeaderboard() {
  const tbody = document.getElementById('agentTbody');
  if (!tbody) return;

  function renderTable() {
    const rows = [...agents].sort((a, b) => (a[agentSort.k] > b[agentSort.k] ? 1 : -1) * agentSort.dir);
    tbody.innerHTML = rows.map(a => `
      <tr>
        <td><div class="agent-cell"><div class="avatar-ring">${a.name.split(' ').map(n => n[0]).join('')}</div><div><div class="name">${a.name}</div><div class="sub">${a.role} · ${a.city}</div></div></div></td>
        <td><b style="color:var(--gold-deep); font-size:13.5px;">${a.propertiesCount || 0}</b> units</td>
        <td>${a.leads}</td>
        <td>${a.deals}</td>
        <td>${fmtCr(a.revenue)}</td>
        <td>${fmtCr(a.commission)}</td>
        <td><span class="badge ${a.conv > 21 ? 'green' : a.conv > 18 ? 'amber' : 'red'}">${a.conv}%</span></td>
        <td class="rating">★ ${a.rating}</td>
        <td><div style="display:flex; align-items:center; gap:8px;"><div class="progress-outer"><div class="progress-inner" style="width:${a.target}%"></div></div><span style="font-size:11px; color:var(--text-400);">${a.target}%</span></div></td>
      </tr>`).join('');
  }

  renderTable();

  document.querySelectorAll('#agentTable th').forEach(th => {
    th.addEventListener('click', () => {
      const k = th.dataset.k;
      agentSort.dir = (agentSort.k === k) ? -agentSort.dir : -1;
      agentSort.k = k;
      renderTable();
    });
  });
}

function renderRevenueStats() {
  const revStats = document.getElementById('revStats');
  if (!revStats) return;
  revStats.innerHTML = revStatsData.map(s => `<div class="card stat-pill"><div class="v">${s.v}</div><div class="l">${s.l}</div></div>`).join('');
}

let paySort = { k: 'client', dir: 1 };

function renderPaymentTracker() {
  const tbody = document.getElementById('payTbody');
  if (!tbody) return;

  function renderTable() {
    tbody.innerHTML = payments.map(p => `
      <tr>
        <td><b>${p.client}</b></td>
        <td>${p.property}</td>
        <td>₹${p.booking.toFixed(1)}L</td>
        <td>₹${p.down.toFixed(1)}L</td>
        <td>${p.installments}</td>
        <td>₹${p.pending.toFixed(1)}L</td>
        <td><span class="badge ${p.status === 'Paid' ? 'green' : p.status === 'Pending' ? 'amber' : 'red'}">${p.status}</span></td>
      </tr>`).join('');
  }

  renderTable();

  document.querySelectorAll('#payTable th').forEach(th => {
    th.addEventListener('click', () => {
      const k = th.dataset.k;
      paySort.dir = (paySort.k === k) ? -paySort.dir : 1;
      paySort.k = k;
      payments.sort((a, b) => {
        const map = { client: 'client', property: 'property', booking: 'booking', down: 'down', installments: 'installments', pending: 'pending', status: 'status' };
        const key = map[k];
        return (a[key] > b[key] ? 1 : -1) * paySort.dir;
      });
      renderTable();
    });
  });
}

function renderCustomerAnalytics() {
  const custStats = document.getElementById('custStats');
  if (custStats) {
    custStats.innerHTML = custStatsData.map(s => `<div class="card stat-pill"><div class="v">${s.v}</div><div class="l">${s.l}</div></div>`).join('');
  }

  const sourceGrid = document.getElementById('sourceGrid');
  if (sourceGrid) {
    sourceGrid.innerHTML = sources.map(s => `
      <div class="card source-card"><div class="source-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${s.icon}</svg></div><div><div class="source-v">${s.v}</div><div class="source-l">${s.n}</div></div></div>`).join('');
  }
}

function renderActivityTimeline() {
  const timeline = document.getElementById('activityTimeline');
  if (!timeline) return;
  timeline.innerHTML = activities.slice(0, 10).map(a => `
    <div class="tl-item"><div class="tl-dot" style="background:${a.bg};">${a.icon}</div>
      <div class="tl-row"><div><div class="tl-title">${a.t}</div><div class="tl-sub">${a.s}</div></div><div class="tl-time">${a.time}</div></div>
    </div>`).join('');
}

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  const shell = document.querySelector('.shell');
  const overlay = document.getElementById('mobileNavOverlay');

  // Hide all sections except the first one on initial load
  if (sections.length > 0) {
    sections.forEach((s, idx) => {
      if (idx !== 0) s.style.display = 'none';
      else s.style.display = 'block';
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const targetSelector = item.dataset.target;
      const target = document.querySelector(targetSelector);
      
      if (target) {
        // Hide all sections
        sections.forEach(s => s.style.display = 'none');
        
        // Show target section
        target.style.display = 'block';
        
        // Update active class on nav items
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Auto close mobile drawer
        if (shell) shell.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('show');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}
