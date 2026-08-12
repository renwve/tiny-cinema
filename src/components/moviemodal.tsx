"use client";

import { FormEvent, useEffect, useState } from "react";
import { Movie } from "@/types/movie";

interface MovieModalProps {
  isOpen: boolean;
  movie?: Movie | null;
  onClose: () => void;
  onSave: (movie: Omit<Movie, "id">) => void;
}

export default function MovieModal({
  isOpen,
  movie,
  onClose,
  onSave,
}: MovieModalProps) {
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  // Fill the form when editing.
  // Clear it when adding a new movie.
  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setActors(movie.actors.join(", "));
      setReleaseYear(movie.releaseYear.toString());
    } else {
      setTitle("");
      setActors("");
      setReleaseYear("");
    }
  }, [movie, isOpen]);

  // Don't display anything when the modal is closed
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Convert the comma-separated actor input
    // into an array of strings.
    const actorList = actors
      .split(",")
      .map((actor) => actor.trim())
      .filter((actor) => actor.length > 0);

    // Send the movie data back to movies/page.tsx
    onSave({
      title: title.trim(),
      actors: actorList,
      releaseYear: Number(releaseYear),
    });

    // Clear the form
    setTitle("");
    setActors("");
    setReleaseYear("");
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {movie
                ? "UPDATE MOVIE"
                : "NEW MOVIE"}
            </span>

            <h2>
              {movie
                ? "Edit Movie"
                : "Add Movie"}
            </h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Movie title */}
          <div className="form-group">
            <label htmlFor="title">
              Movie Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter movie title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              required
            />
          </div>

          {/* Actors */}
          <div className="form-group">
            <label htmlFor="actors">
              Actors
            </label>

            <input
              id="actors"
              type="text"
              placeholder="Actor 1, Actor 2, Actor 3"
              value={actors}
              onChange={(event) =>
                setActors(event.target.value)
              }
              required
            />

            <small>
              Separate multiple actors with commas.
            </small>
          </div>

          {/* Release year */}
          <div className="form-group">
            <label htmlFor="releaseYear">
              Release Year
            </label>

            <input
              id="releaseYear"
              type="number"
              placeholder="2026"
              min="1888"
              max="2100"
              value={releaseYear}
              onChange={(event) =>
                setReleaseYear(event.target.value)
              }
              required
            />
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
            >
              {movie
                ? "Save Changes"
                : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}