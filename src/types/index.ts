// Types pour l'application touristique

export const PLACE_CATEGORIES = [
  'Plages',
  'Sites naturels',
  'Monuments et patrimoine',
  'Musees et culture',
  'Restaurants',
  'Hotels et hebergements',
  'Cafes et salons de the',
  'Shopping et souks',
  'Loisirs et divertissements',
] as const;

export const LIEU_STATUS = {
  ACTIF: 'actif',
  INACTIF: 'inactif',
} as const;

export const LieuStatus = LIEU_STATUS;

export type LieuStatus = (typeof LIEU_STATUS)[keyof typeof LIEU_STATUS];

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
  createdAt?: string;
  updatedAt?: string;
}

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

export interface NewsletterState {}
