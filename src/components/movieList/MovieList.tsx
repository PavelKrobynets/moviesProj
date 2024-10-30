import { useEffect, useState } from "react";
import MovieCard from "../movieCard/MovieCard";
import MovieCardPlaceholder from "../movieCardPlaceholder/MovieCardPlaceholder.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useRequest from "../../hooks/useRequest.ts";
import { MovieWithGenres } from "../../types/type.ts";
import "swiper/css";
import "swiper/css/navigation";
import "./movieList.scss";

interface Props {
  arrow: string;
  url: string;
  title: string;
}

export default function MovieList({ arrow, url, title }: Props) {
  const [movies, setMovies] = useState<MovieWithGenres[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const request = useRequest();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await request.fetchMovies({ url: url });
        setMovies(res);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      <div className="movie-list__top">
        <h3 className="movie-list__top-title">{title}</h3>
        <div className="movie-list__top-buttons">
          <button className={`arrow-left arrow-${arrow}`}>
            <ChevronLeft />
          </button>
          <button className={`arrow-right arrow-${arrow}`}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="movie-list__container">
        {loading ? (
          <MovieCardPlaceholder />
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            navigation={{
              prevEl: `.arrow-left.arrow-${arrow}`,
              nextEl: `.arrow-right.arrow-${arrow}`,
            }}
            modules={[Navigation]}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard
                  img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  title={movie.title}
                  date={movie.release_date}
                  genres={movie.genres}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
