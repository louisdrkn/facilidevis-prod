/**
 * Gestionnaire de cookies compatible avec le navigateur et le serveur
 * Pour une application React/Vite, on utilise document.cookie côté client
 */

import type { CookieOptions } from '@supabase/ssr';

interface Cookie {
  name: string;
  value: string;
  options?: CookieOptions;
}

class CookieStore {
  getAll(): Array<{ name: string; value: string }> {
    if (typeof document === 'undefined') {
      return [];
    }

    const cookies: Array<{ name: string; value: string }> = [];
    const cookieString = document.cookie;

    if (cookieString) {
      cookieString.split(';').forEach((cookie) => {
        const [name, ...rest] = cookie.trim().split('=');
        const value = rest.join('=');
        if (name) {
          cookies.push({ name, value: decodeURIComponent(value) });
        }
      });
    }

    return cookies;
  }

  get(name: string): { name: string; value: string } | undefined {
    const cookies = this.getAll();
    return cookies.find((cookie) => cookie.name === name);
  }

  set(name: string, value: string, options?: CookieOptions): void {
    if (typeof document === 'undefined') {
      return;
    }

    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (options) {
      if (options.path) {
        cookieString += `; path=${options.path}`;
      }
      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }
      if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
      if (options.maxAge) {
        cookieString += `; max-age=${options.maxAge}`;
      }
      if (options.sameSite) {
        const sameSiteValue = typeof options.sameSite === 'boolean' 
          ? (options.sameSite ? 'strict' : 'lax')
          : options.sameSite;
        cookieString += `; samesite=${sameSiteValue}`;
      }
      if (options.secure) {
        cookieString += `; secure`;
      }
    }

    document.cookie = cookieString;
  }

  remove(name: string, options?: CookieOptions): void {
    this.set(name, '', {
      ...options,
      expires: new Date(0),
      maxAge: 0,
    });
  }
}

// Instance singleton pour le navigateur
let cookieStoreInstance: CookieStore | null = null;

export function cookies(): CookieStore {
  if (typeof window === 'undefined') {
    // Côté serveur, retourner une instance vide
    return new CookieStore();
  }

  if (!cookieStoreInstance) {
    cookieStoreInstance = new CookieStore();
  }

  return cookieStoreInstance;
}

