import "./movieInfo.scss";

export default function MovieInfo() {
  return (
    <div className="movie-info">
      <img
        src="/src/assets/poster-placeholder.jpg"
        alt=""
        className="movie-info__image"
      ></img>
      <div className="movie-info__container">
        <h2 className="movie-info__title">Movie Title</h2>
        <p className="movie-info__description">Movie Description</p>
        <p className="movie-info__genre">Genre</p>
        <p className="movie-info__year">Year</p>
        <p className="movie-info__rating">Rating</p>
      </div>
    </div>
  );
}
