export interface Article {
  id_hash: string;
  timestamp: string;
  region: string;
  dulezitost: string;
  tema: string;
  shrnuti: string;
  doporuceny_nadpis: string;
  tagy: string;
  score: string;
  jazyk: string;
  url: string;
  source_name: string;
}

export interface FilterOptions {
  region: string;
  tema: string;
  dulezitost: string;
}
