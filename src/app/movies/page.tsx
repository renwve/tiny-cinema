"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MovieCard from "@/components/moviecard";
import MovieModal from "@/components/moviemodal";
import { Movie } from "@/types/movie";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    fetchMovies();
  }, []);

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

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

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