import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string | number) => void; // Updated to allow string UUIDs from Supabase
}

export default function MovieCard({
  movie,
  onEdit,
  onDelete,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-poster">
        {movie.image_url ? (
          <img src={movie.image_url} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span>🎬</span>
        )}
      </div>

      <div className="movie-content">
        <div className="movie-heading">
          <h2>{movie.title}</h2>
          <span className="movie-year">{movie.release_year}</span>
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