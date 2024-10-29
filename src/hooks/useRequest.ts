interface URL {
  url: string;
}

export default function useRequest({ url }: URL) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTHORIZATION,
    },
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(`Failed fetching trending movies`, error);
      throw error;
    }
  };

  return { fetchMovies, options };
}
