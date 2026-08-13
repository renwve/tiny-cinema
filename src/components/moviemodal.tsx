/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This component displays the form used to create a new movie or modify an existing movie.
 * Input: It receives visibility state, an optional movie, close and save callbacks, and title, actor, and year entries from the user.
 * Processing and Output: It initializes and validates form values, converts comma-separated actors into an array, and outputs normalized movie data to the parent component.
 */
"use client";

import { FormEvent, useEffect, useState } from "react";
import { Movie } from "@/types/movie";

// Component contract: define modal state and the actions supplied by its parent.
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
  // Form state: store the editable values displayed in the modal.
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  // Form initialization: load an existing movie or clear fields for a new record.
  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setActors(movie.actors ? movie.actors.join(", ") : "");
      setReleaseYear(movie.release_year ? movie.release_year.toString() : "");
    } else {
      setTitle("");
      setActors("");
      setReleaseYear("");
    }
  }, [movie, isOpen]);

  // Visibility control: render nothing while the modal is closed.
  if (!isOpen) {
    return null;
  }

  // Form processing: normalize user entries and submit database-compatible values.
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const actorList = actors
      .split(",")
      .map((actor) => actor.trim())
      .filter((actor) => actor.length > 0);

    onSave({
      title: title.trim(),
      actors: actorList,
      release_year: Number(releaseYear), // Saved as release_year for database compatibility
    });

    setTitle("");
    setActors("");
    setReleaseYear("");
  };

  // Modal output: render the overlay, form fields, and command buttons.
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
        {/* Modal heading and close control. */}
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {movie ? "UPDATE MOVIE" : "NEW MOVIE"}
            </span>

            <h2>
              {movie ? "Edit Movie" : "Add Movie"}
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

        {/* Movie input form. */}
        <form onSubmit={handleSubmit}>
          {/* Title input. */}
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

          {/* Comma-separated actor input. */}
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

          {/* Numeric release-year input. */}
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

          {/* Cancel and save actions. */}
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
              {movie ? "Save Changes" : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
