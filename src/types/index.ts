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
  statut: string;
}

export interface User {
  
}

export interface AuthState {
  
}

export interface LieuxState {
  lieux: Lieu[];
  currentLieu: Lieu | null;
  isLoading: boolean;
  error: string | null;
}

export interface NewsletterState {
  
}
