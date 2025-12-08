import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HeaderBeton } from "@/components/layout/HeaderBeton";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Camera, 
  PenLine,
  FileText,
  ChevronRight,
  Filter
} from "lucide-react";
import { statusLabels, statusColors, type Quote, type QuoteStatus } from "@/types/database";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

// Données de démonstration
const mockDevis: Quote[] = [
  {
    id: "1",
    profile_id: "user1",
    client_id: "client1",
    client: { id: "client1", profile_id: "user1", name: "M. Dupont", phone: "0612345678" },
    status: "sent",
    title: "Rénovation cuisine complète",
    total_amount: 4500,
    created_at: "2024-01-10",
  },
  {
    id: "2",
    profile_id: "user1",
    client_id: "client2",
    client: { id: "client2", profile_id: "user1", name: "Mme Martin", phone: "0623456789" },
    status: "signed",
    title: "Toiture garage - Étanchéité",
    total_amount: 8200,
    created_at: "2024-01-08",
  },
  {
    id: "3",
    profile_id: "user1",
    client_id: "client3",
    client: { id: "client3", profile_id: "user1", name: "SCI Les Acacias", phone: "0634567890" },
    status: "draft",
    title: "Ravalement façade immeuble",
    total_amount: 15000,
    created_at: "2024-01-05",
  },
  {
    id: "4",
    profile_id: "user1",
    client_id: "client4",
    client: { id: "client4", profile_id: "user1", name: "M. Bernard", phone: "0645678901" },
    status: "rejected",
    title: "Extension véranda",
    total_amount: 22000,
    created_at: "2024-01-02",
  },
];

const statusFilters: (QuoteStatus | 'all')[] = ['all', 'draft', 'sent', 'signed', 'rejected'];
const statusFilterLabels: Record<string, string> = {
  all: 'Tous',
  ...statusLabels,
};

export default function Devis() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<QuoteStatus | 'all'>('all');
  const [showNewDialog, setShowNewDialog] = useState(false);

  const filteredDevis = selectedFilter === 'all' 
    ? mockDevis 
    : mockDevis.filter(d => d.status === selectedFilter);

  return (
    <AppLayout>
      <HeaderBeton
        title="Mes Devis"
        subtitle={`${mockDevis.length} devis au total`}
      />

      <div className="px-4 py-6">
        {/* Filtres */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          {statusFilters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="whitespace-nowrap"
            >
              {statusFilterLabels[filter]}
            </Button>
          ))}
        </div>

        {/* Liste des devis */}
        <div className="space-y-4">
          {filteredDevis.map((devis) => (
            <div key={devis.id} className="bloc-chantier p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      "status-badge text-xs",
                      statusColors[devis.status]
                    )}>
                      {statusLabels[devis.status]}
                    </span>
                  </div>
                  <p className="font-bold text-foreground truncate">
                    {devis.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {devis.client?.name}
                  </p>
                  <p className="text-xl font-extrabold text-foreground mt-2">
                    {devis.total_amount.toLocaleString('fr-FR')} €
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Créé le {new Date(devis.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDevis.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold text-muted-foreground">
              Aucun devis trouvé
            </p>
          </div>
        )}
      </div>

      {/* FAB Button */}
      <Button
        variant="fab"
        size="fab"
        className="fixed bottom-24 right-4 z-50"
        onClick={() => setShowNewDialog(true)}
      >
        <Plus className="h-8 w-8" />
      </Button>

      {/* Dialog nouveau devis */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Nouveau Devis</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Button
              variant="outline"
              className="w-full h-20 justify-start gap-4"
              onClick={() => {
                setShowNewDialog(false);
                navigate("/scan");
              }}
            >
              <Camera className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="font-bold">Scanner un brouillon</p>
                <p className="text-sm text-muted-foreground">
                  Prenez en photo votre devis manuscrit
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full h-20 justify-start gap-4"
              onClick={() => {
                setShowNewDialog(false);
                // TODO: Navigate to manual form
              }}
            >
              <PenLine className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="font-bold">Créer manuellement</p>
                <p className="text-sm text-muted-foreground">
                  Remplissez le formulaire complet
                </p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
