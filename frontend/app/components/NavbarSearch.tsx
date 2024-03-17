import Image from "next/image";
import searchButton from "../../public/search_icon.svg"

export default function NavbarSearch() {
  return (
    <div className="flex justify-center gap-2 relative">
      <div>
        <input
          type="text"
          name="search-query"
          id="search"
          placeholder="Search..."
          className="w-42 bg-transparent border-solid border-2 outline-none placeholder-white text-white p-2 rounded-full"
        />
      </div>
      <div>
        <button className="flex absolute right-6 top-3">
          <Image
            src={searchButton.src}
            width={20}
            height={20}
            alt="search"
          />
        </button>
      </div>
    </div>
  );
}
