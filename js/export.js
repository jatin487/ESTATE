/* ============================================================
   ESTATIA EXPORT UTILITIES MODULE
=============================================================*/
import { agents, payments } from './data.js';

export function exportCSV(kind) {
  let rows = [];
  if (kind === 'agents') {
    rows.push(['Agent', 'Role', 'Leads Assigned', 'Deals Closed', 'Revenue (Cr)', 'Commission (Cr)', 'Conversion %', 'Rating', 'Target %']);
    agents.forEach(a => rows.push([a.name, a.role, a.leads, a.deals, a.revenue, a.commission, a.conv, a.rating, a.target]));
  } else {
    rows.push(['Client', 'Property', 'Booking Amt (L)', 'Down Payment (L)', 'Installments', 'Pending (L)', 'Status']);
    payments.forEach(p => rows.push([p.client, p.property, p.booking.toFixed(1), p.down.toFixed(1), p.installments, p.pending.toFixed(1), p.status]));
  }
  
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `estatia-${kind}-export.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Attach exportCSV to window so inline onclick handlers continue working smoothly
if (typeof window !== 'undefined') {
  window.exportCSV = exportCSV;
}
