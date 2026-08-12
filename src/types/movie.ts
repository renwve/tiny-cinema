export interface Movie {
  id: number;
  title: string;
  actors: string[];
  releaseYear: number;

  user_id?: string;
  created_at?: string;
}