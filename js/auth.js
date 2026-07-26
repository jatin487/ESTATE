/* ============================================================
   ESTATIA AUTHENTICATION & GATEWAY CONTROLLER MODULE
=============================================================*/
import { getSupabaseClient, getSupabaseCredentials, saveSupabaseCredentials } from './supabase.js';

let currentUser = null;
let isDemoSession = false;

export function initAuth() {
  const authGate = document.getElementById('authGate');
  const dashboardShell = document.getElementById('dashboardShell');

  // Gate Form Elements
  const gateForm = document.getElementById('gateForm');
  const gateEmailGroup = document.getElementById('gateEmailGroup');
  const gatePasswordGroup = document.getElementById('gatePasswordGroup');
  const gateAlert = document.getElementById('gateAlert');
  const gateSubmitBtn = document.getElementById('gateSubmitBtn');
  const gateDemoBtn = document.getElementById('gateDemoBtn');

  // Tabs
  const gateTabSignin = document.getElementById('gateTabSignin');
  const gateTabSignup = document.getElementById('gateTabSignup');

  // User Header & Dropdown Elements
  const userChip = document.getElementById('userChip');
  const userDropdown = document.getElementById('userDropdown');
  const dropdownLogout = document.getElementById('dropdownLogout');

  let gateMode = 'signin'; // 'signin', 'signup'

  // User Chip Dropdown Toggle
  if (userChip && userDropdown) {
    userChip.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => userDropdown.classList.remove('show'));
  }

  // Logout / Lock Dashboard Button
  if (dropdownLogout) {
    dropdownLogout.addEventListener('click', async () => {
      await handleSignOut();
    });
  }

  // Gate Tab Switches
  if (gateTabSignin) gateTabSignin.addEventListener('click', () => setGateMode('signin'));
  if (gateTabSignup) gateTabSignup.addEventListener('click', () => setGateMode('signup'));

  function setGateMode(mode) {
    gateMode = mode;
    hideGateAlert();
    [gateTabSignin, gateTabSignup].forEach(t => t && t.classList.remove('active'));

    if (mode === 'signup') {
      if (gateTabSignup) gateTabSignup.classList.add('active');
      gateSubmitBtn.textContent = 'Create Account';
      if (gateEmailGroup) gateEmailGroup.style.display = 'block';
      if (gatePasswordGroup) gatePasswordGroup.style.display = 'block';
    } else {
      if (gateTabSignin) gateTabSignin.classList.add('active');
      gateSubmitBtn.textContent = 'Sign In';
      if (gateEmailGroup) gateEmailGroup.style.display = 'block';
      if (gatePasswordGroup) gatePasswordGroup.style.display = 'block';
    }
  }

  function showGateAlert(msg, type = 'error') {
    if (!gateAlert) return;
    gateAlert.textContent = msg;
    gateAlert.className = `auth-alert ${type}`;
  }

  function hideGateAlert() {
    if (!gateAlert) return;
    gateAlert.className = 'auth-alert';
    gateAlert.textContent = '';
  }

  // Form Submit Handler
  if (gateForm) {
    gateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideGateAlert();

      const email = document.getElementById('gateEmail').value;
      const password = document.getElementById('gatePassword').value;

      const client = getSupabaseClient();
      if (!client) {
        showGateAlert('Supabase client connection failed.', 'error');
        return;
      }

      gateSubmitBtn.disabled = true;
      gateSubmitBtn.style.opacity = '0.7';

      try {
        if (gateMode === 'signup') {
          const { data, error } = await client.auth.signUp({ email, password });
          if (error) throw error;
          showGateAlert('Account created! Check your email to confirm or sign in now.', 'success');
        } else {
          const { data, error } = await client.auth.signInWithPassword({ email, password });
          if (error) throw error;
          currentUser = data.user;
          isDemoSession = false;
          showGateAlert('Authenticated successfully!', 'success');
          setTimeout(() => unlockDashboard(), 800);
        }
      } catch (err) {
        showGateAlert(err.message || 'Authentication error.', 'error');
      } finally {
        gateSubmitBtn.disabled = false;
        gateSubmitBtn.style.opacity = '1';
      }
    });
  }

  // Demo Mode Button Handler
  if (gateDemoBtn) {
    gateDemoBtn.addEventListener('click', () => {
      isDemoSession = true;
      currentUser = null;
      unlockDashboard();
    });
  }

  // Unlock Dashboard Transition
  function unlockDashboard() {
    if (authGate) authGate.classList.add('hidden');
    if (dashboardShell) dashboardShell.classList.remove('hidden');
    updateHeaderUserInfo();
  }

  // Lock Dashboard (Return to Auth Gate)
  function lockDashboard() {
    if (dashboardShell) dashboardShell.classList.add('hidden');
    if (authGate) authGate.classList.remove('hidden');
    hideGateAlert();
  }

  // Sign Out Handler
  async function handleSignOut() {
    const client = getSupabaseClient();
    if (client) {
      await client.auth.signOut();
    }
    currentUser = null;
    isDemoSession = false;
    lockDashboard();
  }

  function updateHeaderUserInfo() {
    const userChip = document.getElementById('userChip');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const dropdownStatus = document.getElementById('dropdownStatus');
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const sidebarName = document.getElementById('sidebarName');
    const sidebarRole = document.getElementById('sidebarRole');

    if (!userChip) return;

    const avatar = userChip.querySelector('.avatar-ring');
    const un = userChip.querySelector('.un');
    const ur = userChip.querySelector('.ur');

    if (currentUser) {
      const email = currentUser.email || 'User';
      const namePart = email.split('@')[0];
      const initials = email.substring(0, 2).toUpperCase();

      if (avatar) avatar.textContent = initials;
      if (un) un.textContent = namePart;
      if (ur) ur.textContent = 'Authenticated User';

      if (sidebarAvatar) sidebarAvatar.textContent = initials;
      if (sidebarName) sidebarName.textContent = namePart;
      if (sidebarRole) sidebarRole.textContent = 'Authenticated User';

      if (dropdownEmail) dropdownEmail.textContent = email;
      if (dropdownStatus) dropdownStatus.textContent = 'Supabase Session Active';
    } else {
      if (avatar) avatar.textContent = 'RV';
      if (un) un.textContent = 'Rhea Varma';
      if (ur) ur.textContent = 'Head of Sales';

      if (sidebarAvatar) sidebarAvatar.textContent = 'RV';
      if (sidebarName) sidebarName.textContent = 'Rhea Varma';
      if (sidebarRole) sidebarRole.textContent = 'Head of Sales';

      if (dropdownEmail) dropdownEmail.textContent = 'Demo Session Active';
      if (dropdownStatus) dropdownStatus.textContent = 'Demo Mode';
    }
  }

  // Check Active Session on Page Load
  async function checkInitialSession() {
    const client = getSupabaseClient();
    if (!client) {
      lockDashboard();
      return;
    }

    try {
      const { data } = await client.auth.getSession();
      if (data && data.session) {
        currentUser = data.session.user;
        isDemoSession = false;
        unlockDashboard();
      } else {
        lockDashboard();
      }

      client.auth.onAuthStateChange((event, session) => {
        if (session) {
          currentUser = session.user;
          isDemoSession = false;
          unlockDashboard();
        } else if (!isDemoSession) {
          currentUser = null;
          lockDashboard();
        }
      });
    } catch (err) {
      console.error('[Estatia Auth] Session check error:', err);
      lockDashboard();
    }
  }

  checkInitialSession();
}
