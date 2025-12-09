import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authMiddleware } from '@/lib/utils/auth-middleware';

/**
 * Composant AuthGuard qui intercepte toutes les routes
 * et applique le middleware d'authentification Supabase
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("🛡️ [AUTH_GUARD] Checking auth for path:", location.pathname);
    
    const checkAuth = async () => {
      // Timeout de sécurité pour éviter un blocage infini
      const timeoutId = setTimeout(() => {
        console.warn("⚠️ [AUTH_GUARD] Timeout - Forcing check to complete");
        setIsChecking(false);
      }, 3000);

      try {
        const redirectTo = await authMiddleware(location.pathname);
        clearTimeout(timeoutId);
        
        console.log("🛡️ [AUTH_GUARD] Middleware result:", redirectTo || "no redirect");
        
        if (redirectTo) {
          console.log("🛡️ [AUTH_GUARD] Redirecting to:", redirectTo);
          navigate(redirectTo, { replace: true });
        }
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('❌ [AUTH_GUARD] Erreur lors de la vérification de l&apos;authentification:', error);
        // En cas d'erreur, rediriger vers login pour les routes protégées
        if (location.pathname !== '/login') {
          console.log("🛡️ [AUTH_GUARD] Error - Redirecting to login");
          navigate('/login', { replace: true });
        }
      } finally {
        setIsChecking(false);
        console.log("✅ [AUTH_GUARD] Check complete");
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-bold">Vérification de l&apos;authentification...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

