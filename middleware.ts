/**
 * Middleware d'authentification Supabase
 * Intercepte toutes les requêtes et vérifie l'état d'authentification
 * 
 * Pour une application React/Vite, ce middleware est utilisé via un composant
 * de route guard dans App.tsx
 */

import { createClient } from './src/lib/utils/supabase/server';

/**
 * Routes protégées nécessitant une authentification
 */
const PROTECTED_ROUTES = ['/', '/dashboard', '/devis', '/scan', '/clients', '/profil'];

/**
 * Routes publiques (accessibles sans authentification)
 */
const PUBLIC_ROUTES = ['/login'];

/**
 * Vérifie si une route est protégée
 */
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(route);
  });
}

/**
 * Vérifie si une route est publique
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Middleware principal qui vérifie l'authentification
 * Retourne l'URL de redirection si nécessaire, sinon null
 */
export async function authMiddleware(pathname: string): Promise<string | null> {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    const isAuthenticated = !!session?.user;
    const isProtected = isProtectedRoute(pathname);
    const isPublic = isPublicRoute(pathname);

    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
    if (!isAuthenticated && isProtected) {
      return '/login';
    }

    // Si l'utilisateur est connecté et essaie d'accéder à /login
    if (isAuthenticated && pathname === '/login') {
      return '/';
    }

    // Aucune redirection nécessaire
    return null;
  } catch (error) {
    console.error('Erreur dans le middleware d\'authentification:', error);
    // En cas d'erreur, rediriger vers login pour les routes protégées
    if (isProtectedRoute(pathname)) {
      return '/login';
    }
    return null;
  }
}

/**
 * Hook/composant pour utiliser le middleware dans React Router
 * Ceci sera utilisé dans App.tsx via un composant de route guard
 */
export function createAuthGuard() {
  return {
    isProtectedRoute,
    isPublicRoute,
    authMiddleware,
  };
}

