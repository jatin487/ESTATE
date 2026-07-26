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
import './export.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme with Chart refresher callback
  initTheme(() => {
    refreshChartColors();
  });

  // Initialize Authentication & Supabase state
  initAuth();

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

  // Setup Sidebar Navigation Smooth Scroll & ScrollSpy
  setupNavigation();
});

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
        <td><div class="agent-cell"><div class="avatar-ring">${a.name.split(' ').map(n => n[0]).join('')}</div><div><div class="name">${a.name}</div><div class="sub">${a.role}</div></div></div></td>
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
  timeline.innerHTML = activities.map(a => `
    <div class="tl-item"><div class="tl-dot" style="background:${a.bg};">${a.icon}</div>
      <div class="tl-row"><div><div class="tl-title">${a.t}</div><div class="tl-sub">${a.s}</div></div><div class="tl-time">${a.time}</div></div>
    </div>`).join('');
}

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(item.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const sections = document.querySelectorAll('.section');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = sections[0].id;
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 170) current = s.id;
      });
      navItems.forEach(i => i.classList.toggle('active', i.dataset.target === '#' + current));
    }, { passive: true });
  }
}
