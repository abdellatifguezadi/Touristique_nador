// Types pour l'application touristique

export interface Lieu {
  id: number;
  nom: string;
  categorie: string;
  description: string;
  photos: string[];
  horaires: {
    [key: string]: string;
  };
  tarifs: string;
  adresse: string;
  moyens_transport: string[];
  accessibilite: string;
  statut: LieuStatus;
}

export const LieuStatus = {
  ACTIF: 'actif',
  INACTIF: 'inactif',
} as const;

export type LieuStatus = typeof LieuStatus[keyof typeof LieuStatus];

export interface User {
  id : number;
  nom: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" ;
  image: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LieuxState {
  lieux: Lieu[];
  currentLieu: Lieu | null;
  isLoading: boolean;
  error: string | null;
  searchQuery?: string;
  statusFilter?: string;
  categoryFilter?: string;
}

export interface NewsletterState {
  
}
