import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatedOrbs } from "@/components/ui/AnimatedOrbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { MotionContainer, MotionItem } from "@/components/ui/MotionContainer";
import logoFaciliDevis from "@/assets/logo-facilidevis.png";
import { 
  TrendingUp, 
  Euro, 
  FileCheck, 
  Clock, 
  AlertTriangle,
  Phone,
  ChevronRight,
  Sparkles
} from "lucide-react";

// Données de démonstration
const mockKPIs = {
  caMonth: 12450,
  tauxConversion: 68,
  devisEnCours: 7,
  relancesUrgentes: 3,
};

const mockRelances = [
  {
    id: "1",
    clientName: "M. Dupont",
    projectTitle: "Rénovation cuisine",
    amount: 4500,
    daysAgo: 5,
  },
  {
    id: "2", 
    clientName: "Mme Martin",
    projectTitle: "Toiture garage",
    amount: 8200,
    daysAgo: 7,
  },
  {
    id: "3",
    clientName: "SCI Les Acacias",
    projectTitle: "Ravalement façade",
    amount: 15000,
    daysAgo: 10,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || "Artisan";

  return (
    <AppLayout>
      {/* Background Orbs */}
      <AnimatedOrbs />

      {/* Header Futuriste */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="header-future px-4 pt-8 pb-6 relative z-10"
      >
        <div className="relative z-10 flex items-center gap-4">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="p-1.5 glass-card"
          >
            <img 
              src={logoFaciliDevis} 
              alt="FaciliDevis" 
              className="h-12 w-auto"
            />
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-black text-foreground text-3d"
            >
              Bonjour {userName} 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground font-bold flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Prêt à conquérir des chantiers
            </motion.p>
          </div>
        </div>
      </motion.header>

      <div className="px-4 py-6 space-y-6 relative z-10">
        {/* KPIs Grid */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-subtitle mb-4 text-foreground"
          >
            Tableau de bord
          </motion.h2>
          
          <MotionContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
            {/* CA du mois */}
            <MotionItem>
              <GlassCard className="kpi-glass" delay={0}>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Euro className="h-5 w-5 text-primary" />
                  <span className="text-sm font-black">CA du mois</span>
                </div>
                <p className="text-2xl font-black text-foreground gradient-text">
                  {mockKPIs.caMonth.toLocaleString('fr-FR')} €
                </p>
                <div className="flex items-center gap-1 text-success text-sm font-black mt-2">
                  <TrendingUp className="h-4 w-4" />
                  +12%
                </div>
              </GlassCard>
            </MotionItem>

            {/* Taux de conversion */}
            <MotionItem>
              <GlassCard className="kpi-glass" delay={0}>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm font-black">Conversion</span>
                </div>
                <p className="text-2xl font-black text-foreground gradient-text">
                  {mockKPIs.tauxConversion}%
                </p>
                <div className="text-success text-sm font-black mt-2">
                  Excellent !
                </div>
              </GlassCard>
            </MotionItem>

            {/* Devis en cours */}
            <MotionItem>
              <GlassCard className="kpi-glass" delay={0}>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm font-black">En attente</span>
                </div>
                <p className="text-2xl font-black text-foreground">
                  {mockKPIs.devisEnCours}
                </p>
                <div className="text-muted-foreground text-sm font-bold mt-2">
                  devis
                </div>
              </GlassCard>
            </MotionItem>

            {/* Relances urgentes */}
            <MotionItem>
              <GlassCard className="kpi-glass border-alert/30" delay={0}>
                <div className="flex items-center gap-2 text-alert mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm font-black">Urgentes</span>
                </div>
                <p className="text-2xl font-black gradient-text-alert">
                  {mockKPIs.relancesUrgentes}
                </p>
                <div className="text-alert text-sm font-black mt-2 animate-pulse">
                  À relancer !
                </div>
              </GlassCard>
            </MotionItem>
          </MotionContainer>
        </section>

        {/* Actions Urgentes */}
        <section>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mb-4"
          >
            <h2 className="text-subtitle flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-6 w-6 text-alert" />
              Actions Urgentes
            </h2>
          </motion.div>

          <MotionContainer className="space-y-3" staggerDelay={0.1}>
            {mockRelances.map((relance) => (
              <MotionItem key={relance.id}>
                <GlassCard className="p-4" delay={0}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-foreground truncate">
                        {relance.clientName}
                      </p>
                      <p className="text-sm text-muted-foreground font-bold truncate">
                        {relance.projectTitle}
                      </p>
                      <p className="text-lg font-black text-foreground mt-1 gradient-text">
                        {relance.amount.toLocaleString('fr-FR')} €
                      </p>
                      <p className="text-xs text-alert font-black mt-1 animate-pulse">
                        Envoyé il y a {relance.daysAgo} jours
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="gap-2 btn-alert-glow bg-alert hover:bg-alert/90" size="sm">
                          <Phone className="h-4 w-4" />
                          Relancer
                        </Button>
                      </motion.div>
                      <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                        Voir
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </MotionItem>
            ))}
          </MotionContainer>
        </section>
      </div>
    </AppLayout>
  );
}