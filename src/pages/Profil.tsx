import { AppLayout } from "@/components/layout/AppLayout";
import { HeaderBeton } from "@/components/layout/HeaderBeton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Building2, 
  Phone, 
  Mail, 
  LogOut, 
  Settings, 
  HelpCircle,
  ChevronRight,
  Shield,
  Bell,
  CreditCard
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Settings, label: "Paramètres", href: "#settings" },
  { icon: Bell, label: "Notifications", href: "#notifications" },
  { icon: CreditCard, label: "Abonnement", href: "#subscription" },
  { icon: Shield, label: "Sécurité", href: "#security" },
  { icon: HelpCircle, label: "Aide & Support", href: "#help" },
];

export default function Profil() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppLayout>
      <HeaderBeton
        title="Mon Profil"
        showLogo={false}
      />

      <div className="px-4 py-6 space-y-6">
        {/* Infos entreprise */}
        <div className="bloc-chantier p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-hard">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground">
                {user?.email?.split('@')[0] || "Entreprise"}
              </h2>
              <p className="text-sm text-muted-foreground font-bold">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-foreground">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="font-bold">Non renseigné</span>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="font-bold">{user?.email}</span>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-6 border-2">
            Modifier le profil
          </Button>
        </div>

        {/* Menu */}
        <div className="bloc-chantier overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`
                w-full flex items-center justify-between p-4 hover:bg-accent transition-colors
                ${index !== menuItems.length - 1 ? 'border-b-2 border-border' : ''}
              `}
            >
              <div className="flex items-center gap-4">
                <item.icon className="h-6 w-6 text-muted-foreground" />
                <span className="font-black text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Déconnexion */}
        <Button 
          variant="outline" 
          className="w-full gap-3 text-destructive border-2 border-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Se déconnecter
        </Button>

        {/* Version */}
        <p className="text-center text-sm text-muted-foreground font-bold">
          FaciliDevis v1.0.0
        </p>
      </div>
    </AppLayout>
  );
}
