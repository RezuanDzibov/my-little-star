import Link from "next/link";
import Image from "next/image";
import NavSearch from "./NavSearch";

export default function Nav() {
  return (
    <header className="flex justify-center my-6">
      <div className="flex flex-col gap-4 md:flex-row w-5/6 h-18 pt-4 pb-4 px-6 md:py-4 items-center justify-between backdrop-blur-md bg-white/15 rounded-full shadow-md">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <Image
            src="/shooting-star.png"
            width={36}
            height={36}
            alt="logo"
          />
          <h1 className="text-lg">My Little Star</h1>
        </Link>
        <NavSearch/> 
      </div>
    </header> 
  );
}
