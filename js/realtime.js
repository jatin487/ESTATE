/* ============================================================
   ESTATIA REAL-TIME SIMULATION & ENGINE MODULE
=============================================================*/
import { activities, notifData, saveStoredData, kpis, recalculateKPIs } from './data.js';

let isRealtimeActive = true;
let realtimeInterval = null;

export function initRealtimeEngine() {
  initLiveClock();
  setupLiveToggle();
  startSimulationLoop();
  setupTabSync();
}

function initLiveClock() {
  const clockTime = document.getElementById('liveClockTime');
  const clockDate = document.getElementById('liveClockDate');
  
  function updateClock() {
    const now = new Date();
    if (clockTime) {
      clockTime.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    }
    if (clockDate) {
      clockDate.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

function setupLiveToggle() {
  const toggleBtn = document.getElementById('liveToggleBtn');
  const liveBadge = document.getElementById('liveStatusBadge');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isRealtimeActive = !isRealtimeActive;
      if (liveBadge) {
        if (isRealtimeActive) {
          liveBadge.classList.remove('paused');
          liveBadge.querySelector('.live-badge-text').textContent = 'REAL-TIME LIVE';
          showToast("Real-time Feed Resumed", "Live stream updates active", "🟢");
        } else {
          liveBadge.classList.add('paused');
          liveBadge.querySelector('.live-badge-text').textContent = 'PAUSED';
          showToast("Real-time Feed Paused", "Manual updates only", "⏸️");
        }
      }
    });
  }
}

function startSimulationLoop() {
  if (realtimeInterval) clearInterval(realtimeInterval);

  realtimeInterval = setInterval(() => {
    if (!isRealtimeActive) return;
    generateLiveEvent();
  }, 10000); // Trigger live event every 10 seconds
}

const mockClients = ["Ananya Rao", "Rohan Mehta", "Karthik S.", "Meera Talwar", "Aditya Joshi", "Divya Sharma", "Pooja Hegde", "Siddharth Malhotra"];
const mockProjects = ["Skyline Residences", "Whitefield Eco Villas", "Banjara Heights", "Cyber Towers", "Koregaon Park Luxury", "ECR Ocean Drive"];
const mockCities = ["Mumbai", "Bengaluru", "Gurugram", "Pune", "Hyderabad", "Chennai"];

function generateLiveEvent() {
  const eventTypes = [
    { type: 'lead', title: 'New Lead Captured', icon: '👤', bg: '#3E6FA622' },
    { type: 'visit', title: 'Site Visit Completed', icon: '🏠', bg: 'var(--green-soft)' },
    { type: 'payment', title: 'Payment Received', icon: '💳', bg: '#1A7A4C22' },
    { type: 'booking', title: 'Unit Reserved', icon: '🔑', bg: '#C6A14322' }
  ];

  const ev = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const client = mockClients[Math.floor(Math.random() * mockClients.length)];
  const project = mockProjects[Math.floor(Math.random() * mockProjects.length)];
  const city = mockCities[Math.floor(Math.random() * mockCities.length)];
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  let subText = '';
  if (ev.type === 'lead') {
    subText = `${client} · ${project} · via Website`;
  } else if (ev.type === 'visit') {
    subText = `${client} visited ${project}, ${city}`;
  } else if (ev.type === 'payment') {
    const amt = (Math.random() * 5 + 1).toFixed(1);
    subText = `₹${amt}L down payment · ${client}`;
  } else {
    subText = `${client} booked 3BHK in ${project}`;
  }

  // Prepend activity
  activities.unshift({
    t: ev.title,
    s: subText,
    time: timeStr,
    icon: ev.icon,
    bg: ev.bg
  });

  // Keep max 20 items in timeline
  if (activities.length > 20) activities.pop();

  // Re-render timeline if present
  renderTimelineDom();

  // Show floating toast
  showToast(ev.title, subText, ev.icon);

  // Pulse animation on KPI values
  pulseKPIs();
}

function renderTimelineDom() {
  const timeline = document.getElementById('activityTimeline');
  if (!timeline) return;
  timeline.innerHTML = activities.slice(0, 10).map(a => `
    <div class="tl-item"><div class="tl-dot" style="background:${a.bg};">${a.icon}</div>
      <div class="tl-row"><div><div class="tl-title">${a.t}</div><div class="tl-sub">${a.s}</div></div><div class="tl-time">${a.time}</div></div>
    </div>`).join('');
}

function pulseKPIs() {
  const kpiValues = document.querySelectorAll('.kpi-value');
  kpiValues.forEach(el => {
    el.classList.add('pulse-glow');
    setTimeout(() => el.classList.remove('pulse-glow'), 800);
  });
}

export function showToast(title, message, icon = '🔔') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-card';
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

function setupTabSync() {
  window.addEventListener('storage', (e) => {
    if (e.key === 'estatia_dashboard_state_v1') {
      showToast("Data Synchronized", "Updated from another tab", "🔄");
      window.location.reload();
    }
  });
}
