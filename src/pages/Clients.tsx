import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HeaderBeton } from "@/components/layout/HeaderBeton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  User
} from "lucide-react";
import type { Client } from "@/types/database";

// Données de démonstration
const mockClients: Client[] = [
  {
    id: "1",
    profile_id: "user1",
    name: "M. Jean Dupont",
    phone: "06 12 34 56 78",
    email: "jean.dupont@email.fr",
    address: "15 rue des Lilas, 75001 Paris",
  },
  {
    id: "2",
    profile_id: "user1",
    name: "Mme Marie Martin",
    phone: "06 23 45 67 89",
    email: "m.martin@email.fr",
    address: "8 avenue Victor Hugo, 75016 Paris",
  },
  {
    id: "3",
    profile_id: "user1",
    name: "SCI Les Acacias",
    phone: "01 23 45 67 89",
    email: "contact@lesacacias.fr",
    address: "25 boulevard Haussmann, 75009 Paris",
  },
  {
    id: "4",
    profile_id: "user1",
    name: "M. Pierre Bernard",
    phone: "06 45 67 89 01",
    email: "p.bernard@email.fr",
    address: "3 place de la République, 75011 Paris",
  },
  {
    id: "5",
    profile_id: "user1",
    name: "Mme Sophie Leroy",
    phone: "06 56 78 90 12",
    email: "sophie.leroy@email.fr",
    address: "42 rue de la Paix, 75002 Paris",
  },
];

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  return (
    <AppLayout>
      <HeaderBeton
        title="Mes Clients"
        subtitle={`${mockClients.length} contacts`}
      />

      <div className="px-4 py-6">
        {/* Barre de recherche */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Liste des clients */}
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <div key={client.id} className="bloc-chantier p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate">
                    {client.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Phone className="h-4 w-4" />
                    <span>{client.phone}</span>
                  </div>
                  {client.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              {client.address && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{client.address}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold text-muted-foreground">
              Aucun client trouvé
            </p>
          </div>
        )}
      </div>

      {/* FAB Button */}
      <Button
        variant="fab"
        size="fab"
        className="fixed bottom-24 right-4 z-50"
      >
        <Plus className="h-8 w-8" />
      </Button>
    </AppLayout>
  );
}
