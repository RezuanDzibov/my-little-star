"use client";

import * as z from "zod";
import axios from "axios";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {registrationFormSchema} from "@/app/registration/registration.schema";
import { Config } from "@/app/common/config/config"

export default function RegistrationPage () {
  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleSubmit = async (schema: z.infer<typeof registrationFormSchema>) => {
    axios.post(`${Config.NEXT_PUBLIC_BACKEND_URI}/auth/registration`, schema)
      .then(response => {
        if (response.status === 201) {
          router.push("/");
        }
      })
      .catch(error => {
          if (axios.isAxiosError((error))) {
            const {response} = error;
            if (response && response.status === 409) {
              const errorSections = document.getElementsByClassName("errorSection");
              for (let i = 0; i < errorSections.length; i++) {
                const errorSection = errorSections[i] as HTMLElement;
                errorSection.textContent = "User with username or email already exists";
                errorSection.classList.remove("hidden");
              }
            }
          }
        }
      );
  };

  const onClickLogin = async () => {
    router.push("/login")
  }

  return (
    <main className="flex flex-grow w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-[80%] h-[80%] justify-evenly p-10 rounded-xl gap-12 border-2 border-white md:w-[65%"
        >
          <div className="errorSection hidden bg-red-600 p-8 rounded-xl">
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your username"
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
            name="email"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your email" type="email" {...field} />
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
              Register
            </Button>
            <div className="flex flex-col items-center gap-4 md:w-[50%]">
              Already have an account?
              <Button onClick={onClickLogin} className="w-full bg-green-600 hover:bg-green-700">
                Login
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};