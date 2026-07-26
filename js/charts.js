/* ============================================================
   ESTATIA CHARTS MODULE
=============================================================*/
import { months, propTypes, cities, agents, rand, sources } from './data.js';

let chartRegistry = [];

function CV(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function gridColor() {
  return CV('--border');
}

function textColor() {
  return CV('--text-600');
}

const green = () => CV('--green-700');
const gold = () => CV('--gold-deep');
const goldLight = () => CV('--gold-light');

const commonScales = () => ({
  x: { grid: { display: false }, ticks: { color: textColor() } },
  y: { grid: { color: gridColor() }, ticks: { color: textColor() } }
});

function mkChart(id, config) {
  const ctx = document.getElementById(id);
  if (!ctx) return null;
  const c = new window.Chart(ctx, config);
  chartRegistry.push({ c, id, config });
  return c;
}

export function initCharts() {
  if (typeof window.Chart === 'undefined') return;

  window.Chart.defaults.font.family = "'Inter', sans-serif";
  window.Chart.defaults.font.size = 11.5;

  // 1. Monthly Sales Trend
  const salesTrendData = months.map(() => rand(28, 52));
  mkChart('chSalesTrend', {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Sales (₹ Cr)',
        data: salesTrendData,
        borderColor: gold(),
        backgroundColor: 'rgba(198,161,67,0.15)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2.5
      }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  // 2. Revenue Trend
  const revTrendData = months.map(() => rand(6, 11));
  mkChart('chRevTrend', {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Revenue (₹ Cr)',
        data: revTrendData,
        borderColor: green(),
        backgroundColor: 'rgba(19,84,61,0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2.5
      }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  // 3. Sales by Property Type
  mkChart('chByType', {
    type: 'doughnut',
    data: {
      labels: propTypes,
      datasets: [{
        data: [128, 84, 52, 96, 64],
        backgroundColor: [green(), gold(), '#3E6FA6', '#8AA097', goldLight()],
        borderWidth: 0
      }]
    },
    options: { plugins: { legend: { position: 'right', labels: { color: textColor(), boxWidth: 10, padding: 12 } } }, maintainAspectRatio: false, cutout: '62%' }
  });

  // 4. Sales by City
  mkChart('chByCity', {
    type: 'bar',
    data: {
      labels: cities,
      datasets: [{ label: '₹ Cr', data: cities.map(() => rand(30, 95)), backgroundColor: gold(), borderRadius: 6 }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  // 5. Sales by Agent
  mkChart('chByAgent', {
    type: 'bar',
    data: {
      labels: agents.slice(0, 6).map(a => a.name.split(' ')[0]),
      datasets: [{ label: '₹ Cr', data: agents.slice(0, 6).map(a => a.revenue), backgroundColor: green(), borderRadius: 6 }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  // 6. Average Property Price
  mkChart('chAvgPrice', {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: '₹/sq.ft',
        data: months.map((_, i) => 7800 + i * 140 + rand(-200, 200)),
        borderColor: '#3E6FA6',
        backgroundColor: 'rgba(62,111,166,0.1)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 2.5
      }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  // 7. QoQ growth
  mkChart('chQoQ', {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{ label: 'Growth %', data: [6.2, 8.9, 5.4, 11.3], backgroundColor: [gold(), green(), gold(), green()], borderRadius: 8 }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  // 8. YoY comparison
  mkChart('chYoY', {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        { label: 'FY24-25', data: [62, 71, 68, 84], backgroundColor: 'rgba(138,160,151,0.5)', borderRadius: 6 },
        { label: 'FY25-26', data: [74, 88, 79, 102], backgroundColor: gold(), borderRadius: 6 }
      ]
    },
    options: { plugins: { legend: { labels: { color: textColor() } } }, scales: commonScales(), maintainAspectRatio: false }
  });

  // Inventory Charts
  mkChart('chInvDist', {
    type: 'doughnut',
    data: {
      labels: ['Available', 'Sold', 'Reserved', 'Under Construction'],
      datasets: [{ data: [214, 342, 48, 96], backgroundColor: ['#3E6FA6', green(), gold(), '#8AA097'], borderWidth: 0 }]
    },
    options: { plugins: { legend: { position: 'right', labels: { color: textColor(), boxWidth: 10 } } }, maintainAspectRatio: false, cutout: '60%' }
  });

  mkChart('chInvCat', {
    type: 'bar',
    data: {
      labels: ['Residential', 'Commercial', 'Luxury'],
      datasets: [{ data: [480, 128, 32], backgroundColor: [green(), gold(), '#3E6FA6'], borderRadius: 8 }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  mkChart('chPriceRange', {
    type: 'bar',
    data: {
      labels: ['<50L', '50L-1Cr', '1-2Cr', '2-5Cr', '5Cr+'],
      datasets: [{ data: [62, 154, 201, 168, 55], backgroundColor: goldLight(), borderRadius: 8 }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  mkChart('chAvailability', {
    type: 'pie',
    data: {
      labels: ['Available', 'Sold', 'Reserved'],
      datasets: [{ data: [214, 342, 48], backgroundColor: ['#3E6FA6', green(), gold()], borderWidth: 0 }]
    },
    options: { plugins: { legend: { position: 'right', labels: { color: textColor(), boxWidth: 10 } } }, maintainAspectRatio: false }
  });

  // Revenue Section Charts
  mkChart('chRevMonth', {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{ label: '₹ Cr', data: revTrendData, backgroundColor: green(), borderRadius: 6 }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  mkChart('chRevAgent', {
    type: 'bar',
    data: {
      labels: agents.map(a => a.name.split(' ')[0]),
      datasets: [{ label: '₹ Cr', data: agents.map(a => a.revenue), backgroundColor: gold(), borderRadius: 6 }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  mkChart('chRevType', {
    type: 'doughnut',
    data: {
      labels: propTypes,
      datasets: [{ data: [34, 22, 14, 20, 10], backgroundColor: [green(), gold(), '#3E6FA6', '#8AA097', goldLight()], borderWidth: 0 }]
    },
    options: { plugins: { legend: { position: 'right', labels: { color: textColor(), boxWidth: 10 } } }, maintainAspectRatio: false, cutout: '60%' }
  });

  mkChart('chRevForecast', {
    type: 'line',
    data: {
      labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      datasets: [{
        label: 'Forecast ₹ Cr',
        data: [9.1, 9.8, 10.4, 11.2, 12.1, 12.8],
        borderColor: gold(),
        backgroundColor: 'rgba(198,161,67,0.15)',
        borderDash: [6, 4],
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        borderWidth: 2.5
      }]
    },
    options: { plugins: { legend: { display: false } }, scales: commonScales(), maintainAspectRatio: false }
  });

  // Customer Sources Polar Area Chart
  mkChart('chSources', {
    type: 'polarArea',
    data: {
      labels: sources.map(s => s.n),
      datasets: [{
        data: sources.map(s => s.v),
        backgroundColor: [
          green() + 'CC', gold() + 'CC', '#3E6FA6CC', '#8AA097CC',
          goldLight() + 'CC', '#C24A3CCC', '#9C7C24CC', '#1A7A4CCC'
        ]
      }]
    },
    options: {
      plugins: { legend: { position: 'right', labels: { color: textColor(), boxWidth: 10 } } },
      scales: { r: { grid: { color: gridColor() }, ticks: { display: false } } },
      maintainAspectRatio: false
    }
  });
}

export function refreshChartColors() {
  chartRegistry.forEach(({ c }) => {
    if (c.options.scales) {
      Object.values(c.options.scales).forEach(sc => {
        if (sc.grid) sc.grid.color = gridColor();
        if (sc.ticks) sc.ticks.color = textColor();
      });
    }
    if (c.options.plugins && c.options.plugins.legend && c.options.plugins.legend.labels) {
      c.options.plugins.legend.labels.color = textColor();
    }
    c.update();
  });
}
