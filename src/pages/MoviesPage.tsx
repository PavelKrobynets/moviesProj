import TypeMovieGrid from "../components/TypeMovieGrid/TypeMovieGrid";
import { useParams } from "react-router-dom";

export default function MoviesPage() {
  const { type } = useParams<{ type: string }>();

  return (
    <div className="movies-page">
      <TypeMovieGrid type={type!} />
    </div>
  );
}
