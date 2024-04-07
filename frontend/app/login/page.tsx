"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/app/login/login.schema";
import { Config } from "@/app/common/config/config"
import {IJWTResponse} from "@/app/login/interfaces";
import useAuth from "@/app/auth/auth.context";

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (schema: z.infer<typeof loginSchema>) => {
    axios.post(`${Config.NEXT_PUBLIC_BACKEND_URI}/auth/login`, schema)
      .then(response => {
        if (response.status == 201) {
          const data: IJWTResponse = response.data;

          localStorage.setItem("accessToken", data.accessToken);

          setIsLoggedIn(true);

          router.push("/");
        }
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          const { response } = error;

          if (response?.status === 404) {
            const errorSection = document.getElementsByClassName('errorSection')[0];

            errorSection.textContent = "User not found";
            errorSection.classList.remove("hidden");
          } else if (response?.status === 401) {
            const errorSection = document.getElementsByClassName("errorSection")[0];

            errorSection.textContent = "Your login or username invalid";
            errorSection.classList.remove("hidden");
          }
        }
      });
  }

  const handleOnClickGoToRegistrationPage = async () => {
    router.push("/registration")
  }

  return (
    <main className="flex flex-grow w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-[80%] h-[80%] justify-evenly p-10 rounded-xl gap-12 border-2 border-white md:w-[65%]"
        >
          <div className="errorSection hidden bg-red-600 p-8 rounded-xl">
          </div>
          <FormField
            control={form.control}
            name="login"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your login"
                      type="string"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              );
            }}
          />
          <div className="flex flex-col gap-4 items-center">
            <Button type="submit" className="w-full md:w-[50%]">
              Login
            </Button>
            <div className="flex flex-col items-center gap-4 md:w-[50%]">
              Already have an account?
              <Button onClick={ handleOnClickGoToRegistrationPage } className="w-full bg-green-600 hover:bg-green-700">
                Registration
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}