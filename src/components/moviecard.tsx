import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export default function MovieCard({
  movie,
  onEdit,
  onDelete,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-poster">
        <span>🎬</span>
      </div>

      <div className="movie-content">
        <div className="movie-heading">
          <h2>{movie.title}</h2>
          <span className="movie-year">{movie.releaseYear}</span>
        </div>

        <div className="movie-info">
          <h4>Actors</h4>

          <ul>
            {movie.actors.map((actor) => (
              <li key={actor}>{actor}</li>
            ))}
          </ul>
        </div>

        <div className="movie-actions">
          <button
            className="edit-button"
            onClick={() => onEdit(movie)}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => onDelete(movie.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}