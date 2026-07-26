/* ============================================================
   SUPABASE CLIENT INITIALIZER MODULE
=============================================================*/

const SUPABASE_URL_KEY = 'estatia-supabase-url';
const SUPABASE_ANON_KEY = 'estatia-supabase-anon-key';

let supabaseInstance = null;

export function getSupabaseCredentials() {
  const url = localStorage.getItem(SUPABASE_URL_KEY) || (typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_URL : '') || '';
  const key = localStorage.getItem(SUPABASE_ANON_KEY) || (typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_ANON_KEY : '') || '';
  return { url, key };
}

export function saveSupabaseCredentials(url, key) {
  if (url) localStorage.setItem(SUPABASE_URL_KEY, url.trim());
  if (key) localStorage.setItem(SUPABASE_ANON_KEY, key.trim());
  supabaseInstance = null; // reset instance so next call reinitializes
}

export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;

  const { url, key } = getSupabaseCredentials();

  if (!url || !key) {
    console.warn('[Estatia] Supabase credentials not configured. Please enter your Supabase URL & Anon Key via the Auth Settings menu.');
    return null;
  }

  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      supabaseInstance = window.supabase.createClient(url, key);
      return supabaseInstance;
    } else {
      console.error('[Estatia] Supabase JS library is not loaded on window.');
      return null;
    }
  } catch (err) {
    console.error('[Estatia] Failed to initialize Supabase client:', err);
    return null;
  }
}
