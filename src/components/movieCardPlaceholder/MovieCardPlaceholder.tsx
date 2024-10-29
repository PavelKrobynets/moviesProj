import "./movieCardPlaceholder.scss";

export default function MovieCardPlaceholder() {
  return (
    <div className={`movie-placeholder flashing`}>
      <div className="movie-placeholder__image"></div>
      <div className="movie-placeholder__info">
        <p className="movie-placeholder__info-title">Loading...</p>
      </div>
    </div>
  );
}
