/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This page provides the main interface for viewing and managing the Tiny Cinema movie collection.
 * Input: It receives movie records from Supabase and add, edit, delete, and form entries from the user.
 * Processing and Output: It performs database CRUD operations, refreshes local state, displays errors, and outputs the collection grid and movie editor modal.
 */
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MovieCard from "@/components/moviecard";
import MovieModal from "@/components/moviemodal";
import { Movie } from "@/types/movie";
import { createClient } from "@/lib/supabase/client";

// Shared database connection: provide browser access to the movies table.
const supabase = createClient();

export default function MoviesPage() {
  // Page state: track movie data, modal visibility, selection, and loading errors.
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Initial data loading: retrieve the collection when the page mounts.
  useEffect(() => {
    fetchMovies();
  }, []);

  // Database read: load movies in newest-first order.
  const fetchMovies = async () => {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage("Error loading movies from database: " + error.message);
    } else if (data) {
      setMovies(data as Movie[]);
    }
  };

  // Modal controls: open the form in either create or edit mode.
  const handleAddMovie = () => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Database delete: confirm the request, remove the record, and refresh the list.
  const handleDeleteMovie = async (id: string | number) => {
    const confirmed = window.confirm("Are you sure you want to delete this movie?");

    if (!confirmed) return;

    const { error } = await supabase
      .from("movies")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete movie: " + error.message);
    } else {
      // Refresh list after deletion
      fetchMovies();
    }
  };

  // Database write: update the selected record or insert a new one.
  const handleSaveMovie = async (movieData: Omit<Movie, "id">) => {
    if (selectedMovie) {
      // UPDATE operation in Supabase
      const { error } = await supabase
        .from("movies")
        .update(movieData)
        .eq("id", selectedMovie.id);

      if (error) {
        alert("Failed to update movie: " + error.message);
        return;
      }
    } else {
      // CREATE operation in Supabase
      const { error } = await supabase
        .from("movies")
        .insert([movieData]);

      if (error) {
        alert("Failed to add movie: " + error.message);
        return;
      }
    }

    setIsModalOpen(false);
    setSelectedMovie(null);
    fetchMovies(); // Refresh list to reflect database changes
  };

  // Page output: render navigation, collection controls, movie cards, and the modal.
  return (
    <div className="site">
      <Navbar />

      <main className="main">
        <section className="hero">
          <div>
            <span className="eyebrow">IMR DATABASE</span>
            <h1>Movie Collection</h1>
            <p>Manage the movies in the Internet Movies Rental database.</p>
          </div>

          <button className="add-movie-button" onClick={handleAddMovie}>
            <span>+</span>
            Add Movie
          </button>
        </section>

        {errorMessage && (
          <div style={{ color: "red", padding: "1rem", textAlign: "center" }}>
            {errorMessage}
          </div>
        )}

        <section className="movie-section">
          <div className="section-heading">
            <div>
              <span className="section-label">COLLECTION</span>
              <h2>All Movies</h2>
            </div>

            <span className="movie-count">
              {movies.length} {movies.length === 1 ? "movie" : "movies"}
            </span>
          </div>

          {movies.length > 0 ? (
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onEdit={handleEditMovie}
                  onDelete={handleDeleteMovie}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🎬</div>
              <h3>No movies yet</h3>
              <p>Add your first movie to start building the collection.</p>
              <button className="add-movie-button" onClick={handleAddMovie}>
                <span>+</span>
                Add Movie
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <MovieModal
        isOpen={isModalOpen}
        movie={selectedMovie}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMovie(null);
        }}
        onSave={handleSaveMovie}
      />
    </div>
  );
}
