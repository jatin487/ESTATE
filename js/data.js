/* ============================================================
   ESTATIA MOCK & LOCALSTORAGE DATA ENGINE
=============================================================*/

const STORAGE_KEY = 'estatia_dashboard_state_v1';

export const cities = ["Mumbai", "Bengaluru", "Pune", "Hyderabad", "Gurugram", "Chennai", "Noida", "Kolkata"];
export const propTypes = ["Apartment", "Villa", "Plot", "Commercial", "Penthouse"];
export const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

export const icons = {
  trend: '<path d="M4 17l5-5 4 4 7-8"/><path d="M14 8h6v6"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9 9.5a2 2 0 0 1 2-1.3h1.3a2 2 0 0 1 0 4h-1a2 2 0 0 0 0 4H13a2 2 0 0 0 2-1.3"/>',
  badge: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>',
  home: '<path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v10h12V10"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1.3"/><circle cx="4" cy="12" r="1.3"/><circle cx="4" cy="18" r="1.3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2.5 2.5"/>',
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c1.4-4.4 4.3-6.4 7.5-6.4s6.1 2 7.5 6.4"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5"/>',
  deal: '<path d="M3 12l4-4h6l4 4-4 4H7z"/><path d="M12 8v8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 13h.01"/><path d="M3 10h18"/>',
  funnel: '<path d="M4 4h16l-6 8v6l-4-2v-4z"/>',
  chart: '<path d="M4 19h16"/><path d="M7 19V9M12 19V5M17 19v-7"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 13V9M9 3h6"/>'
};

export function rand(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

export function fmtCr(v) {
  return "₹" + (typeof v === 'number' ? v.toFixed(1) : parseFloat(v || 0).toFixed(1)) + " Cr";
}

// Default Dealers Dataset
const defaultAgents = [
  { id: "agent-1", name: "Arjun Mehta", role: "Senior Agent", email: "arjun.mehta@estatia.com", phone: "+91 98201 11234", city: "Mumbai", leads: 186, deals: 42, revenue: 18.4, commission: 0.92, conv: 22.6, rating: 4.8, target: 96, propertiesCount: 42 },
  { id: "agent-2", name: "Kavya Nair", role: "Senior Agent", email: "kavya.nair@estatia.com", phone: "+91 98450 22345", city: "Bengaluru", leads: 172, deals: 38, revenue: 16.1, commission: 0.81, conv: 22.1, rating: 4.7, target: 88, propertiesCount: 36 },
  { id: "agent-3", name: "Rohan Kapoor", role: "Agent", email: "rohan.kapoor@estatia.com", phone: "+91 98112 33456", city: "Gurugram", leads: 158, deals: 34, revenue: 14.3, commission: 0.72, conv: 21.5, rating: 4.6, target: 82, propertiesCount: 28 },
  { id: "agent-4", name: "Sara Ahmed", role: "Agent", email: "sara.ahmed@estatia.com", phone: "+91 98230 44567", city: "Pune", leads: 149, deals: 31, revenue: 12.9, commission: 0.65, conv: 20.8, rating: 4.5, target: 79, propertiesCount: 24 },
  { id: "agent-5", name: "Vikram Iyer", role: "Agent", email: "vikram.iyer@estatia.com", phone: "+91 98400 55678", city: "Chennai", leads: 140, deals: 27, revenue: 10.6, commission: 0.53, conv: 19.3, rating: 4.4, target: 71, propertiesCount: 20 },
  { id: "agent-6", name: "Neha Joshi", role: "Junior Agent", email: "neha.joshi@estatia.com", phone: "+91 98900 66789", city: "Hyderabad", leads: 121, deals: 22, revenue: 8.4, commission: 0.42, conv: 18.2, rating: 4.3, target: 64, propertiesCount: 16 },
  { id: "agent-7", name: "Dev Malhotra", role: "Junior Agent", email: "dev.malhotra@estatia.com", phone: "+91 98100 77890", city: "Noida", leads: 110, deals: 19, revenue: 7.1, commission: 0.36, conv: 17.3, rating: 4.2, target: 58, propertiesCount: 12 },
  { id: "agent-8", name: "Priya Sen", role: "Junior Agent", email: "priya.sen@estatia.com", phone: "+91 98300 88901", city: "Kolkata", leads: 95, deals: 15, revenue: 5.6, commission: 0.28, conv: 15.8, rating: 4.1, target: 49, propertiesCount: 10 }
];

// Default Properties Dataset
const defaultProperties = [
  { id: "prop-101", title: "Skyline Residences Unit 402", type: "Apartment", city: "Mumbai", price: 2.8, sqft: 1850, dealerName: "Arjun Mehta", status: "Available", category: "Luxury", icon: "🏙️" },
  { id: "prop-102", title: "Whitefield Eco Villas Unit 12", type: "Villa", city: "Bengaluru", price: 3.5, sqft: 3200, dealerName: "Kavya Nair", status: "Hot Selling", category: "Residential", icon: "🏡" },
  { id: "prop-103", title: "Cyber Towers Floor 8 Office", type: "Commercial", city: "Gurugram", price: 4.2, sqft: 4500, dealerName: "Rohan Kapoor", status: "Reserved", category: "Commercial", icon: "🏢" },
  { id: "prop-104", title: "Koregaon Park Penthouse A", type: "Penthouse", city: "Pune", price: 5.1, sqft: 4100, dealerName: "Sara Ahmed", status: "Available", category: "Luxury", icon: "🏰" },
  { id: "prop-105", title: "ECR Ocean Drive Plot 45", type: "Plot", city: "Chennai", price: 1.6, sqft: 2400, dealerName: "Vikram Iyer", status: "Sold", category: "Residential", icon: "🏞️" },
  { id: "prop-106", title: "Banjara Heights Suite 601", type: "Apartment", city: "Hyderabad", price: 2.1, sqft: 1650, dealerName: "Neha Joshi", status: "Available", category: "Residential", icon: "🏙️" },
  { id: "prop-107", title: "Expressway Tech Park Shop 3", type: "Commercial", city: "Noida", price: 1.4, sqft: 1200, dealerName: "Dev Malhotra", status: "Available", category: "Commercial", icon: "🏪" },
  { id: "prop-108", title: "Salt Lake Garden Villa B", type: "Villa", city: "Kolkata", price: 2.3, sqft: 2600, dealerName: "Priya Sen", status: "Sold", category: "Residential", icon: "🏡" }
];

export const defaultKpis = [
  { label: "Total Sales Value", value: "₹482.6 Cr", trend: "+12.4%", up: true, icon: "trend" },
  { label: "Total Revenue", value: "₹96.3 Cr", trend: "+9.8%", up: true, icon: "coin" },
  { label: "Total Commission Earned", value: "₹14.2 Cr", trend: "+6.1%", up: true, icon: "badge" },
  { label: "Properties Sold", value: "342", trend: "+8.2%", up: true, icon: "home" },
  { label: "Active Listings", value: "128", trend: "+3.4%", up: true, icon: "list" },
  { label: "Available Properties", value: "214", trend: "-2.1%", up: false, icon: "key" },
  { label: "New Leads", value: "1,248", trend: "+15.6%", up: true, icon: "user" },
  { label: "Qualified Leads", value: "486", trend: "+11.2%", up: true, icon: "check" },
  { label: "Deals Closed", value: "342", trend: "+8.2%", up: true, icon: "deal" },
  { label: "Deals in Progress", value: "96", trend: "+4.7%", up: true, icon: "clock" },
  { label: "Pending Payments", value: "₹18.6 Cr", trend: "-3.9%", up: false, icon: "wallet" },
  { label: "Lead Conversion Rate", value: "27.4%", trend: "+2.3%", up: true, icon: "funnel" },
  { label: "Average Deal Value", value: "₹1.41 Cr", trend: "+5.5%", up: true, icon: "chart" },
  { label: "Average Closing Time", value: "38 days", trend: "-4 days", up: true, icon: "timer" }
];

export const notifData = [
  { t: "Follow-up due", s: "Ananya Rao — 2:00 PM today", c: "amber", i: "⏰" },
  { t: "Payment overdue", s: "Karthik S. — ₹4.2L pending 6 days", c: "red", i: "⚠️" },
  { t: "Listing expiring soon", s: "Skyline Residences Unit 402 — 3 days left", c: "amber", i: "🏷️" },
  { t: "New lead assigned", s: "Ishaan Bhatt assigned to Kavya Nair", c: "blue", i: "👤" },
  { t: "High priority client", s: "Meera Talwar flagged VIP — budget ₹5 Cr+", c: "gold", i: "⭐" },
  { t: "Document pending", s: "Sale deed — Sharma family, Gurugram", c: "amber", i: "📄" },
  { t: "Registration scheduled", s: "Unit B-1204 — Jul 29, 11:30 AM", c: "green", i: "📅" }
];

export const tickerData = [
  { l: "Total Sales Value", v: "₹482.6 Cr", up: true, d: "+12.4%" },
  { l: "Deals Closed", v: "342", up: true, d: "+8.2%" },
  { l: "New Leads", v: "1,248", up: true, d: "+15.6%" },
  { l: "Avg Deal Value", v: "₹1.41 Cr", up: true, d: "+5.5%" },
  { l: "Conversion Rate", v: "27.4%", up: true, d: "+2.3%" },
  { l: "Pending Payments", v: "₹18.6 Cr", up: false, d: "-3.9%" },
  { l: "Active Listings", v: "128", up: true, d: "+3.4%" },
  { l: "Avg Closing Time", v: "38 days", up: true, d: "-4 days" }
];

export const leadStatsData = [
  { v: "1,248", l: "Total Leads" }, { v: "38", l: "Today's Leads" }, { v: "312", l: "Hot Leads" },
  { v: "486", l: "Cold Leads" }, { v: "94", l: "Lost Leads" }, { v: "27", l: "Follow-ups Due Today" },
  { v: "41", l: "Upcoming Site Visits" }, { v: "27.4%", l: "Conversion Rate" }
];

export const funnelStages = [
  { name: "New Lead", count: 1248 }, { name: "Contacted", count: 946 }, { name: "Site Visit Scheduled", count: 618 },
  { name: "Site Visit Completed", count: 452 }, { name: "Negotiation", count: 287 }, { name: "Booking", count: 176 },
  { name: "Registration", count: 149 }, { name: "Deal Closed", count: 128 }
];

export const followUps = [
  { n: "Ananya Rao", t: "Call back re: 3BHK Bandra", time: "Today · 2:00 PM" },
  { n: "Karthik Suresh", t: "Send updated floor plan", time: "Today · 4:30 PM" },
  { n: "Meera Talwar", t: "Site visit — Whitefield Villas", time: "Tomorrow · 10:00 AM" },
  { n: "Ishaan Bhatt", t: "Site visit — Skyline Residences", time: "Tomorrow · 3:00 PM" },
  { n: "Divya Prakash", t: "Negotiation follow-up", time: "Jul 27 · 11:00 AM" }
];

export const invData = [
  { v: 640, l: "Total Properties", p: 100 }, { v: 214, l: "Available", p: 33 }, { v: 342, l: "Sold", p: 53 },
  { v: 48, l: "Reserved", p: 8 }, { v: 96, l: "Under Construction", p: 15 }, { v: 544, l: "Ready to Move", p: 85 },
  { v: 128, l: "Commercial", p: 20 }, { v: 480, l: "Residential", p: 75 }, { v: 32, l: "Luxury Properties", p: 5 }
];

export const revStatsData = [
  { v: "₹96.3 Cr", l: "Gross Revenue" }, { v: "₹81.7 Cr", l: "Net Revenue" }, { v: "₹8.6 Cr", l: "Monthly Revenue" },
  { v: "₹22.4 Cr", l: "Expected Revenue" }, { v: "₹18.6 Cr", l: "Outstanding Payments" }, { v: "₹14.2 Cr", l: "Commission Paid" }, { v: "34.6%", l: "Profit Margin" }
];

export const clientNames = ["Ananya Rao", "Karthik Suresh", "Meera Talwar", "Ishaan Bhatt", "Divya Prakash", "Rahul Nanda", "Fatima Sheikh", "Aditya Rao", "Sneha Kulkarni", "Yusuf Khan"];

export const payments = clientNames.map((n, i) => {
  const booking = rand(5, 25);
  const down = rand(booking * 0.4, booking * 0.6);
  const pending = rand(0, booking * 0.5);
  const statusArr = ["Paid", "Pending", "Overdue"];
  const status = statusArr[i % 3];
  return { client: n, property: cities[i % cities.length] + " · " + propTypes[i % propTypes.length] + " " + (101 + i * 3), booking, down, installments: Math.ceil(booking / 2.5) + " of " + (Math.ceil(booking / 2.5) + 2), pending, status };
});

export const custStatsData = [
  { v: "1,842", l: "Total Buyers" }, { v: "412", l: "Returning Customers" }, { v: "1,430", l: "First-time Buyers" },
  { v: "4.6 / 5", l: "Customer Satisfaction" }, { v: "268", l: "Referral Customers" }, { v: "₹1.28 Cr", l: "Avg Purchase Value" }
];

export const sources = [
  { n: "Website", v: 284, icon: '<path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/><circle cx="12" cy="12" r="9"/>' },
  { n: "Instagram", v: 246, icon: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r="1"/>' },
  { n: "Facebook", v: 158, icon: '<circle cx="12" cy="12" r="9"/><path d="M13.5 21v-7h2.2l.3-2.7h-2.5V9.5c0-.8.2-1.3 1.4-1.3h1.3V5.8A17 17 0 0 0 14 5.6c-2 0-3.3 1.2-3.3 3.4v1.9H8.5v2.7H11V21"/>' },
  { n: "Google Ads", v: 192, icon: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>' },
  { n: "WhatsApp", v: 221, icon: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8.6 19z"/><path d="M9 10c0 3 2 5 5 5"/>' },
  { n: "Referral", v: 268, icon: '<circle cx="9" cy="9" r="3"/><circle cx="17" cy="16" r="3"/><path d="M11.5 10.5l3.5 4"/>' },
  { n: "Walk-in", v: 96, icon: '<path d="M12 3v6M9 21l3-6 3 6M8 12h8"/>' },
  { n: "Property Portals", v: 143, icon: '<rect x="3.5" y="4.5" width="17" height="13" rx="2"/><path d="M8 21h8M12 17.5V21"/>' }
];

export const mapPins = [
  { city: "Mumbai", top: "28%", left: "22%", type: "premium", price: "₹28,400/sq.ft" },
  { city: "Bengaluru", top: "62%", left: "38%", type: "hot", price: "₹9,800/sq.ft" },
  { city: "Pune", top: "48%", left: "30%", type: "available", price: "₹8,200/sq.ft" },
  { city: "Hyderabad", top: "58%", left: "52%", type: "hot", price: "₹7,600/sq.ft" },
  { city: "Gurugram", top: "14%", left: "46%", type: "premium", price: "₹14,900/sq.ft" },
  { city: "Chennai", top: "78%", left: "48%", type: "sold", price: "₹7,100/sq.ft" },
  { city: "Noida", top: "16%", left: "55%", type: "available", price: "₹9,300/sq.ft" },
  { city: "Kolkata", top: "38%", left: "74%", type: "sold", price: "₹6,400/sq.ft" }
];

export const activities = [
  { t: "New lead captured", s: "Ishaan Bhatt · Skyline Residences · via Instagram", time: "9:12 AM", icon: "👤", bg: "#3E6FA622" },
  { t: "Site visit completed", s: "Meera Talwar · Whitefield Villas", time: "Yesterday · 4:40 PM", icon: "🏠", bg: "var(--green-soft)" },
  { t: "Property booked", s: "Karthik Suresh · Unit B-1204, Gurugram", time: "Yesterday · 2:05 PM", icon: "🔑", bg: "#C6A14322" },
  { t: "Payment received", s: "₹6.4L down payment · Ananya Rao", time: "Jul 23 · 11:30 AM", icon: "💳", bg: "#1A7A4C22" },
  { t: "Deal closed", s: "Sneha Kulkarni · Palm Grove Apartments · ₹1.6 Cr", time: "Jul 22 · 5:15 PM", icon: "✅", bg: "var(--green-soft)" },
  { t: "New property added", s: "Emerald Heights, Tower C · 3BHK · Pune", time: "Jul 21 · 10:00 AM", icon: "🏗️", bg: "#C6A14322" }
];

// STATE MANAGEMENT IN LOCALSTORAGE
export let agents = [...defaultAgents];
export let properties = [...defaultProperties];
export let kpis = [...defaultKpis];

export function loadStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.agents && Array.isArray(parsed.agents)) {
        agents.length = 0;
        agents.push(...parsed.agents);
      }
      if (parsed.properties && Array.isArray(parsed.properties)) {
        properties.length = 0;
        properties.push(...parsed.properties);
      }
      if (parsed.kpis && Array.isArray(parsed.kpis)) {
        kpis.length = 0;
        kpis.push(...parsed.kpis);
      }
    } else {
      saveStoredData();
    }
  } catch (err) {
    console.warn("Could not load from localStorage, using default data:", err);
  }
}

export function saveStoredData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      agents,
      properties,
      kpis,
      timestamp: Date.now()
    }));
  } catch (err) {
    console.warn("Could not save to localStorage:", err);
  }
}

export function addDealer(dealer) {
  const newDealer = {
    id: "agent-" + (agents.length + 1) + "-" + Date.now().toString(36),
    name: dealer.name,
    role: dealer.role || "Agent",
    email: dealer.email || `${dealer.name.toLowerCase().replace(/\s+/g, '.')}@estatia.com`,
    phone: dealer.phone || "+91 98000 00000",
    city: dealer.city || "Mumbai",
    leads: parseInt(dealer.leads || 0),
    deals: parseInt(dealer.deals || 0),
    revenue: parseFloat(dealer.revenue || 0),
    commission: parseFloat(dealer.commission || (dealer.revenue * 0.05)),
    conv: parseFloat(dealer.conv || 20.0),
    rating: parseFloat(dealer.rating || 4.5),
    target: parseInt(dealer.target || 75),
    propertiesCount: parseInt(dealer.propertiesCount || 0)
  };
  agents.unshift(newDealer);
  recalculateKPIs();
  saveStoredData();
  return newDealer;
}

export function addProperty(property) {
  const newProp = {
    id: "prop-" + (properties.length + 101) + "-" + Date.now().toString(36),
    title: property.title,
    type: property.type || "Apartment",
    city: property.city || "Mumbai",
    price: parseFloat(property.price || 1.5),
    sqft: parseInt(property.sqft || 1500),
    dealerName: property.dealerName || (agents[0] ? agents[0].name : "Unassigned"),
    status: property.status || "Available",
    category: property.category || "Residential",
    icon: property.type === "Villa" ? "🏡" : property.type === "Commercial" ? "🏢" : property.type === "Penthouse" ? "🏰" : property.type === "Plot" ? "🏞️" : "🏙️"
  };
  
  properties.unshift(newProp);

  // Increment assigned dealer's property count
  const dealerObj = agents.find(a => a.name.toLowerCase() === newProp.dealerName.toLowerCase());
  if (dealerObj) {
    dealerObj.propertiesCount = (dealerObj.propertiesCount || 0) + 1;
    if (newProp.status === "Sold") {
      dealerObj.deals += 1;
      dealerObj.revenue += newProp.price;
      dealerObj.commission += newProp.price * 0.05;
    }
  }

  recalculateKPIs();
  saveStoredData();
  return newProp;
}

export function recalculateKPIs() {
  const totalSalesVal = properties.reduce((sum, p) => sum + (p.price || 0), 0) + 480; // baseline
  const totalProps = properties.length + 632;
  const availProps = properties.filter(p => p.status === "Available").length + 210;
  const soldProps = properties.filter(p => p.status === "Sold").length + 338;
  const totalRev = agents.reduce((sum, a) => sum + (a.revenue || 0), 0);
  const totalComm = agents.reduce((sum, a) => sum + (a.commission || 0), 0);

  if (kpis[0]) kpis[0].value = `₹${totalSalesVal.toFixed(1)} Cr`;
  if (kpis[1]) kpis[1].value = `₹${totalRev.toFixed(1)} Cr`;
  if (kpis[2]) kpis[2].value = `₹${totalComm.toFixed(1)} Cr`;
  if (kpis[3]) kpis[3].value = `${soldProps}`;
  if (kpis[4]) kpis[4].value = `${totalProps}`;
  if (kpis[5]) kpis[5].value = `${availProps}`;
  
  if (invData[0]) invData[0].v = totalProps;
  if (invData[1]) invData[1].v = availProps;
  if (invData[2]) invData[2].v = soldProps;
}

// Initializing state on script load
loadStoredData();
