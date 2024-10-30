export interface Movie {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieWithGenres extends Omit<Movie, "genre_ids"> {
  genres: string[];
}

export interface URL {
  url: string;
}
