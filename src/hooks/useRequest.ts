interface URL {
  url: string;
}

export default function useRequest() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTHORIZATION,
    },
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_GENRES, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("Failed fetching genres", error);
      throw error;
    }
  };

  const fetchMovies = async ({ url }: URL) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data.results);
      return data.results;
    } catch (error) {
      console.error(`Failed fetching trending movies`, error);
      throw error;
    }
  };

  return { fetchMovies, fetchGenres };
}
