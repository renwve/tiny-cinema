export interface Movie {
  id: string | number;
  title: string;
  actors: string[];
  release_year: number; // Renamed to match the database column name
  image_url?: string;   // Added in case you/your teammate add image uploads later
  user_id?: string;
  created_at?: string;
}