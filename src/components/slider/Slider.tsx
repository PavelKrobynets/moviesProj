import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useRequest from "../../hooks/useRequest";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.scss";

interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
}

export default function Slider() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(2);
  const request = useRequest();

  useEffect(() => {
    request.fetchTrendingMovies().then((res) => setMovies(res.results));

    const handleResize = () => {
      if (window.innerWidth > 1440) {
        setSlidesPerView(3);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Swiper
      className="slider"
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={slidesPerView}
      spaceBetween={0}
      autoplay={true}
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
