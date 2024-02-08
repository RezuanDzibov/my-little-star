import SectionBar from "./SeactionBar";
import MovieCard from "./MovieCard";

export default function MovieSection() {
  return (
    <section className="flex flex-col items-center">
      <SectionBar sectionName="Movies" />
      <div className="w-[95%] min-w-[265px] place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-6 place-content-evenly backdrop-blur-md bg-white/15 shadow-md rounded-3xl mb-6 py-6">
          <MovieCard movieName="Interstellar" moviePoster="/content/inter.webp" />
          <MovieCard movieName="Interstellar" moviePoster="/content/inter.webp" />
          <MovieCard movieName="Interstellar" moviePoster="/content/inter.webp" />
          <MovieCard movieName="Interstellar" moviePoster="/content/inter.webp" />
          <MovieCard movieName="Interstellar" moviePoster="/content/inter.webp" />
          <MovieCard movieName="Interstellar" moviePoster="/content/inter.webp" />
          <MovieCard movieName="Interstellar" moviePoster="/content/inter.webp" />
      </div>
    </section>
  );
}
