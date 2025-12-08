import { ReactNode } from "react";
import logoFaciliDevis from "@/assets/logo-facilidevis.png";

interface HeaderBetonProps {
  title?: string;
  subtitle?: ReactNode;
  showLogo?: boolean;
}

export function HeaderBeton({ title, subtitle, showLogo = true }: HeaderBetonProps) {
  return (
    <header className="header-beton px-4 pt-8 pb-6">
      <div className="relative z-10">
        {showLogo && (
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1 bg-card border-3 border-border rounded-md shadow-hard">
              <img 
                src={logoFaciliDevis} 
                alt="FaciliDevis" 
                className="h-12 w-auto"
              />
            </div>
          </div>
        )}
        {title && (
          <h1 className="text-title text-card">{title}</h1>
        )}
        {subtitle && (
          <div className="text-lg font-black text-card/90 mt-1">
            {subtitle}
          </div>
        )}
      </div>
    </header>
  );
}
