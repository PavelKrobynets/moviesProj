import "./movieCard.scss";

interface Props {
  img: string;
  title: string;
  date: string;
  genres: string[];
}

export default function MovieCard({ img, title, date, genres }: Props) {
  return (
    <div className="movie-card">
      <img src={img} alt="movie-image" className="movie-card__image" />
      <div className="movie-card__info">
        <p className="movie-card__info-title">{title}</p>
        <p className="movie-card__info-text">{`${date}, ${genres.join()}`}</p>
      </div>
    </div>
  );
}
