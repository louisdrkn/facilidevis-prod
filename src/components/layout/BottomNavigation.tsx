import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, FileText, Camera, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Accueil" },
  { to: "/devis", icon: FileText, label: "Devis" },
  { to: "/scan", icon: Camera, label: "Scan" },
  { to: "/clients", icon: Users, label: "Clients" },
  { to: "/profil", icon: User, label: "Profil" },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="bottom-nav-glass">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {/* Glow indicator for active state */}
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute -top-1 w-12 h-1 rounded-full bg-primary"
                    style={{
                      boxShadow: "0 0 20px hsl(var(--primary) / 0.6)"
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className={cn(
                    "h-6 w-6 transition-all",
                    isActive && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
                  )} />
                </motion.div>
                
                <span className={cn(
                  "text-xs font-bold transition-all",
                  isActive && "text-primary"
                )}>
                  {item.label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}