import "./movieCard.scss";

export default function MovieCard() {
  return (
    <div className="movie-card">
      <img
        src="https://upload.wikimedia.org/wikipedia/ru/thumb/0/05/Venom_poster.jpg/640px-Venom_poster.jpg"
        alt="movie-image"
        className="movie-card__image"
      />
      <div className="movie-card__info">
        <p className="movie-card__info-title">venom</p>
        <p className="movie-card__info-text">2024, fantasy</p>
      </div>
    </div>
  );
}
