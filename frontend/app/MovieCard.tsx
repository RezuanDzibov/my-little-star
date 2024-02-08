import Image from "next/image";

export default function MovieCard({
  movieName,
  moviePoster,
}: {
  movieName: string;
  moviePoster: string;
}) {
  return (
    <div className="w-60 h-[340px] rounded-3xl shadow-2xl p-2 overflow-hidden border-2">
      <div className="flex relative h-[290px] z-50">
        <Image
          src={moviePoster}
          alt="poster"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="flex justify-center mt-2">
        <h1 className="z-50">{movieName}</h1>
      </div>
    </div>
  );
}
