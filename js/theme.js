/* ============================================================
   ESTATIA THEME MANAGER MODULE
=============================================================*/

const STORAGE_KEY = 'estatia-theme-mode';

export function initTheme(onThemeChangeCallback) {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');

  const sunIcon = `<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>`;
  const moonIcon = `<path d="M20 14.5a8.5 8.5 0 0 1-11-11 8.5 8.5 0 1 0 11 11z"/>`;

  // Load saved theme or system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.innerHTML = moonIcon;
    } else {
      root.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.innerHTML = sunIcon;
    }
    localStorage.setItem(STORAGE_KEY, theme);
    if (typeof onThemeChangeCallback === 'function') {
      onThemeChangeCallback(theme);
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
}
