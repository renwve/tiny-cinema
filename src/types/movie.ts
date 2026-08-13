/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This file defines the shared data structure used for movie records throughout the application.
 * Input: Its fields represent movie values received from forms and the Supabase movies table.
 * Processing and Output: TypeScript uses the interface for compile-time validation and outputs no user interface or runtime data.
 */

// Movie model: keep component and database field names consistent.
export interface Movie {
  id: string | number;
  title: string;
  actors: string[];
  release_year: number; // Renamed to match the database column name
  image_url?: string;   // Added in case you/your teammate add image uploads later
  user_id?: string;
  created_at?: string;
}
