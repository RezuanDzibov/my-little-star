import Link from "next/link";
import Image from "next/image";
import NavbarSearch from "./NavbarSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <header className="flex justify-center mt-10 min-w-full sticky top-0">
      <div className="flex flex-col gap-4 md:flex-row w-5/6 h-18 pt-4 pb-4 px-6 md:py-4 items-center justify-between backdrop-blur-md bg-primary rounded-full shadow-md">
        <div>
          <Link href="/" className="flex flex-row gap-2 items-center">
            <Image src="/shooting-star.png" width={36} height={36} alt="logo" />
            <h1 className="text-lg">{process.env.PROJECT_NAME}</h1>
          </Link>
        </div>
        <div className="flex">
          <NavbarSearch />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Rezuan Dzibov</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
