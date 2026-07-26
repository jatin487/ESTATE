# Estatia — Sales Intelligence Dashboard

A modern, responsive, high-performance real estate sales intelligence dashboard featuring real-time property analytics, revenue forecasting, agent leaderboards, customer demographic insights, and interactive property mapping.

![Estatia Dashboard](https://img.shields.io/badge/Status-Active-brightgreen) ![License-MIT](https://img.shields.io/badge/License-MIT-blue)

---

## 🌟 Key Features

- **📊 Command Center & Business Overview**: Real-time sales metrics, revenue, inventory status, and conversion KPIs.
- **📈 Sales & Revenue Analytics**: Interactive charts powered by Chart.js (monthly trends, property type distribution, QoQ/YoY growth, price/sq.ft metrics, and 6-month revenue forecasting).
- **👥 Agent Leaderboard**: Sortable agent performance table with conversion rates, commission tracking, and progress metrics.
- **🗺️ Interactive Property Map**: Geographical view of properties color-coded by availability (Available, Sold, Premium, Hot Selling) with instant hover tooltips.
- **🔍 Smart Search & Global Filters**: Instant multi-attribute search across properties, clients, booking IDs, and agents, plus multi-criteria filter bar.
- **🌙 Dark / Light Mode**: Dynamic color scheme switching with `localStorage` persistence.
- **📥 Data Export**: Print-ready PDF report generation and structured CSV exports for agents and payment ledgers.

---

## 📁 Repository Structure

```text
ESTATE/
├── index.html                           # Primary web application entry point
├── estatia-real-estate-dashboard.html   # Backwards-compatible entry alias
├── package.json                         # NPM dependencies and scripts
├── .gitignore                           # Git ignore definitions
├── README.md                            # Documentation and guide
├── css/
│   ├── tokens.css                       # Design tokens, variables, typography & colors
│   ├── layout.css                       # Shell layout, grid, sidebar, topbar & responsive rules
│   ├── components.css                   # Cards, tables, badges, map, search & timeline styles
│   └── styles.css                       # Master CSS stylesheet importing all modules
└── js/
    ├── data.js                          # Centralized mock datasets (Agents, KPIs, Payments, etc.)
    ├── theme.js                         # Dark / Light theme manager with persistent state
    ├── charts.js                        # Chart.js initialization & dynamic theme updater
    ├── filters.js                       # Search indexing & multi-attribute table filters
    ├── map.js                           # Interactive map rendering & status filtering
    ├── export.js                        # CSV & PDF exporting utility functions
    └── app.js                           # Main application entry point orchestrating all modules
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)

### Quick Start

1. **Clone or navigate to project directory**:
   ```bash
   cd ESTATE
   ```

2. **Run local development server**:
   ```bash
   npm run dev
   ```
   Or launch with simple static server:
   ```bash
   npm start
   ```

3. **Open browser**:
   Navigate to `http://localhost:5173` (or the URL output in your terminal).

---

## 🛠️ Technology Stack

- **HTML5**: Semantic markup & ARIA accessibility attributes.
- **CSS3**: Native CSS custom properties, CSS Grid/Flexbox, Glassmorphic effects, smooth keyframe animations.
- **JavaScript (ES Modules)**: Native modular architecture without build requirements.
- **Chart.js (v4.4.4)**: Interactive data visualizations.

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
