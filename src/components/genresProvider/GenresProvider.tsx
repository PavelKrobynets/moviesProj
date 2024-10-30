import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import useRequest from "../../hooks/useRequest"; // Adjust the import path as needed

export interface Genre {
  id: number;
  name: string;
}

const GenresContext = createContext<Genre[]>([]);

export const useGenres = () => useContext(GenresContext);

interface GenresProviderProps {
  children: ReactNode;
}

export function GenresProvider({ children }: GenresProviderProps) {
  const [state, setState] = useState<Genre[]>([]);
  const request = useRequest();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await request.fetchGenres();
        setState(data.genres);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <GenresContext.Provider value={state}>{children}</GenresContext.Provider>
  );
}
