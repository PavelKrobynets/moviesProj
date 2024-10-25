import { Swiper, SwiperSlide } from "swiper/react";
import useRequest from "../../hooks/useRequest";
import { useEffect, useState } from "react";
import "swiper/css";

interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
}

export default function Slider() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const request = useRequest();

  useEffect(() => {
    request.fetchTrendingMovies().then((res) => setMovies(res.results));
  }, []);

  return (
    <Swiper
      className="swiper"
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {movies?.map((movie) => (
        <SwiperSlide key={movie.id} className="slider__slide">
          <img
            className="slider_img"
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={`Movie backdrop for ${movie.id}`}
          />
          <div className="slide__title">{movie.title}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
