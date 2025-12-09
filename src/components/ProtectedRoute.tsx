import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Composant ProtectedRoute - Couche de sécurité supplémentaire
 * Le middleware (AuthGuard) gère déjà les redirections principales,
 * ce composant sert de double vérification côté client
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  console.log("🔒 [PROTECTED_ROUTE] Render check - isLoading:", isLoading, "user:", user?.email || "none");

  if (isLoading) {
    console.log("🔒 [PROTECTED_ROUTE] Still loading, showing spinner");
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-bold">Chargement...</p>
        </div>
      </div>
    );
  }

  // Double vérification : si pas d&apos;utilisateur, rediriger vers login
  // (le middleware devrait déjà avoir géré cela, mais c&apos;est une sécurité supplémentaire)
  if (!user) {
    console.log("🔒 [PROTECTED_ROUTE] No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("✅ [PROTECTED_ROUTE] User authenticated, rendering children");
  return <>{children}</>;
}
