import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, HardHat, AlertCircle, UserPlus, Sparkles } from "lucide-react";
import logoFaciliDevis from "@/assets/logo-facilidevis.png";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatedOrbs } from "@/components/ui/AnimatedOrbs";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Login() {
  const navigate = useNavigate();
  const { user, login, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    
    let result;
    if (isSignUp) {
      result = await signUp(email, password);
      if (!result.error) {
        setSuccessMessage("Compte créé ! Vérifiez votre email pour confirmer votre inscription.");
        setIsLoading(false);
        return;
      }
    } else {
      result = await login(email, password);
      if (!result.error) {
        navigate("/");
        return;
      }
    }
    
    if (result.error) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <AnimatedOrbs />

      {/* Header Futuriste */}
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="header-future px-6 pt-16 pb-12 flex-shrink-0 relative z-10"
      >
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo avec glow effect */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="mb-6 p-2 glass-card"
          >
            <img 
              src={logoFaciliDevis} 
              alt="FaciliDevis" 
              className="h-20 w-auto"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 text-foreground"
          >
            <HardHat className="h-8 w-8 text-primary" />
            <span className="text-3xl font-black tracking-tight text-3d">FaciliDevis</span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground font-bold mt-3 flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            L'outil premium des pros du bâtiment
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.p>
        </div>
      </motion.header>

      {/* Formulaire Glass */}
      <div className="flex-1 px-6 py-8 relative z-10">
        <GlassCard delay={0.3} className="p-6 max-w-sm mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message d'erreur */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-destructive/20 border border-destructive/50 text-destructive p-4 rounded-lg flex items-center gap-3 backdrop-blur-sm"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="font-bold text-sm">{error}</p>
              </motion.div>
            )}

            {/* Message de succès */}
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-success/20 border border-success/50 text-success p-4 rounded-lg flex items-center gap-3 backdrop-blur-sm"
              >
                <UserPlus className="h-5 w-5 flex-shrink-0" />
                <p className="font-bold text-sm">{successMessage}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-black flex items-center gap-2 text-foreground">
                <Mail className="h-5 w-5 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glass h-14 text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-black flex items-center gap-2 text-foreground">
                <Lock className="h-5 w-5 text-primary" />
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-glass h-14 text-lg"
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground font-medium">Minimum 6 caractères</p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-black btn-glow bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading 
                  ? (isSignUp ? "Création..." : "Connexion...") 
                  : (isSignUp ? "Créer mon compte" : "Se connecter")
                }
              </Button>
            </motion.div>

            {!isSignUp && (
              <div className="text-center">
                <Button variant="link" className="text-muted-foreground font-bold hover:text-primary transition-colors">
                  Mot de passe oublié ?
                </Button>
              </div>
            )}
          </form>
        </GlassCard>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center max-w-sm mx-auto"
        >
          <p className="text-muted-foreground text-sm font-bold">
            {isSignUp ? "Déjà un compte ?" : "Pas encore de compte ?"}
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline" 
              className="mt-3 w-full h-12 glass-card border-0 hover:bg-primary/10"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setSuccessMessage(null);
              }}
            >
              {isSignUp ? "Se connecter" : "Créer un compte"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}