// Types TypeScript pour Supabase

export interface Profile {
  id: string;
  company_name: string;
  phone: string;
  email?: string;
  created_at?: string;
}

export interface Client {
  id: string;
  profile_id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  created_at?: string;
}

export type QuoteStatus = 'draft' | 'sent' | 'signed' | 'rejected';

export interface Quote {
  id: string;
  profile_id: string;
  client_id: string;
  client?: Client;
  status: QuoteStatus;
  title: string;
  description?: string;
  total_amount: number;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

// Helper pour les statuts en français
export const statusLabels: Record<QuoteStatus, string> = {
  draft: 'Brouillon',
  sent: 'Envoyé',
  signed: 'Signé',
  rejected: 'Refusé',
};

export const statusColors: Record<QuoteStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  sent: 'bg-primary text-primary-foreground',
  signed: 'bg-success text-success-foreground',
  rejected: 'bg-destructive text-destructive-foreground',
};
