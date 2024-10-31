import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useRequest from "../../hooks/useRequest";
import { useEffect, useState } from "react";
import { Movie } from "../../types/type";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.scss";

export default function Slider() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(2);
  const { fetchMovies, isLoadingGenres } = useRequest();

  useEffect(() => {
    if (isLoadingGenres) {
      return;
    }
    fetchMovies({
      url: import.meta.env.VITE_TRENDING_MOVIES,
    }).then((res) => setMovies(res));

    const handleResize = () => {
      if (window.innerWidth > 1440) {
        setSlidesPerView(3);
      } else if (window.innerWidth < 615) {
        setSlidesPerView(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoadingGenres]);

  return (
    <Swiper
      className="slider"
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={slidesPerView}
      speed={1500}
      spaceBetween={0}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
      }}
      navigation={true}
      pagination={{
        clickable: true,
      }}
    >
      {movies?.map((movie) => (
        <SwiperSlide key={movie.id} className="slider__slide">
          <img
            className="slider__slide-img"
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={`Movie backdrop for ${movie.id}`}
          />
          <div className="slider__slide-title">{movie.title}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
