export interface Movie {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  release_date: string;
  vote_average: number;
  overview: string;
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

export interface SingleMovie {
  adult: boolean;
  poster_path: string;
  genres: string[];
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  vote_average: number;
}
