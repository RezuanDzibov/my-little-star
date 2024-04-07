"use client";

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
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import useAuth from "@/app/auth/auth.context";
import {Config} from "@/app/common/config/config";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function Navbar () {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const onClickNavigateToLogin = async () => {
    router.push("/login");
  }

  const onClickLogout = async () => {
    setIsLoggedIn(false);

    localStorage.removeItem("accessToken");

    router.push("/");
  }

  return (
    <header className="flex justify-center mt-10 min-w-full sticky top-0">
      <div
        className="flex flex-col gap-4 md:flex-row w-5/6 h-18 pt-4 pb-4 px-6 md:py-4 items-center justify-between backdrop-blur-md bg-primary rounded-full shadow-md">
        <div>
          <Link href="/" className="flex flex-row gap-2 items-center">
            <Image src="/shooting-star.png" width={36} height={36} alt="logo"/>
            <h1 className="text-lg">{Config.PROJECT_NAME}</h1>
          </Link>
        </div>
        <div className="flex gap-2">
          <NavbarSearch/>
          <DropdownMenu>
            {isLoggedIn ? (
              <div key="loggedIn">
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>RD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <DropdownMenuLabel>Rezuan Dzibov</DropdownMenuLabel>
                    <Button className="bg-red-600 hover:bg-red-700 h-8 w-[80%]" onClick={onClickLogout}>
                      Logout
                    </Button>
                  </div>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            ) : (
              <div className="loggedOut">
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Unknown</DropdownMenuLabel>
                </DropdownMenuContent>
              </div>
            )}
          </DropdownMenu>
          {!isLoggedIn && (
            <Button className="bg-green-600 hover:bg-green-700" onClick={onClickNavigateToLogin}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
