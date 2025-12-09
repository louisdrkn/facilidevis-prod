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

  if (isLoading) {
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
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
