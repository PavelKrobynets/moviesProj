import MovieCard from "../movieCard/MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./movieList.scss";

interface Props {
  id: string;
}

export default function MovieList({ id }: Props) {
  return (
    <div className="movie-list">
      <div className="movie-list__top">
        <h3 className="movie-list__top-title">headline</h3>
        <div className="movie-list__top-buttons">
          <button className={`arrow-left arrow-${id}`}>
            <ChevronLeft />
          </button>
          <button className={`arrow-right arrow-${id}`}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="movie-list__container">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          navigation={{
            nextEl: `.arrow-left.arrow-${id}`,
            prevEl: `.arrow-right.arrow-${id}`,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
