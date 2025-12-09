/**
 * Middleware d'authentification Supabase (côté client)
 * Pour une application React/Vite, ce middleware est utilisé via un composant
 * de route guard dans App.tsx
 * 
 * NOTE: Ce fichier est dans src/ pour éviter que Vercel le détecte comme middleware Edge
 */

import { supabase } from '@/integrations/supabase/client';

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
  console.log("🔍 [AUTH_MIDDLEWARE] Checking path:", pathname);
  
  try {
    // Timeout de sécurité pour éviter un blocage
    const sessionPromise = supabase.auth.getSession();
    const timeoutPromise = new Promise<{ data: { session: null } }>((resolve) => 
      setTimeout(() => resolve({ data: { session: null } }), 2000)
    );
    
    const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]);
    
    console.log("🔍 [AUTH_MIDDLEWARE] Session check result:", session?.user?.email || "no session");

    const isAuthenticated = !!session?.user;
    const isProtected = isProtectedRoute(pathname);
    const isPublic = isPublicRoute(pathname);

    console.log("🔍 [AUTH_MIDDLEWARE] Auth state - authenticated:", isAuthenticated, "protected:", isProtected, "public:", isPublic);

    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
    if (!isAuthenticated && isProtected) {
      console.log("🔍 [AUTH_MIDDLEWARE] Not authenticated, redirecting to login");
      return '/login';
    }

    // Si l'utilisateur est connecté et essaie d'accéder à /login
    if (isAuthenticated && pathname === '/login') {
      console.log("🔍 [AUTH_MIDDLEWARE] Authenticated user on login page, redirecting to home");
      return '/';
    }

    // Aucune redirection nécessaire
    console.log("🔍 [AUTH_MIDDLEWARE] No redirect needed");
    return null;
  } catch (error) {
    console.error('❌ [AUTH_MIDDLEWARE] Erreur dans le middleware d&apos;authentification:', error);
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

