"use client";

import { useState } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MovieCard from "@/components/moviecard";
import MovieModal from "@/components/moviemodal";
import { Movie } from "@/types/movie";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null);

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleDeleteMovie = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmed) {
      return;
    }

    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id)
    );
  };

  const handleSaveMovie = (
    movieData: Omit<Movie, "id">
  ) => {
    if (selectedMovie) {
      setMovies((currentMovies) =>
        currentMovies.map((movie) =>
          movie.id === selectedMovie.id
            ? {
                ...movie,
                ...movieData,
              }
            : movie
        )
      );
    }

    else {
      const newMovie: Movie = {
        id: Date.now(),
        ...movieData,
      };

      setMovies((currentMovies) => [
        ...currentMovies,
        newMovie,
      ]);
    }

    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="site">
      <Navbar />

      <main className="main">
        <section className="hero">
          <div>
            <span className="eyebrow">
              IMR DATABASE
            </span>

            <h1>Movie Collection</h1>

            <p>
              Manage the movies in the Internet Movies
              Rental database.
            </p>
          </div>

          <button
            className="add-movie-button"
            onClick={handleAddMovie}
          >
            <span>+</span>
            Add Movie
          </button>
        </section>

        <section className="movie-section">
          <div className="section-heading">
            <div>
              <span className="section-label">
                COLLECTION
              </span>

              <h2>All Movies</h2>
            </div>

            <span className="movie-count">
              {movies.length}{" "}
              {movies.length === 1
                ? "movie"
                : "movies"}
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
              <div className="empty-icon">
                🎬
              </div>

              <h3>No movies yet</h3>

              <p>
                Add your first movie to start building
                the collection.
              </p>

              <button
                className="add-movie-button"
                onClick={handleAddMovie}
              >
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