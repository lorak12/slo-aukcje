"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, LoaderCircle } from "lucide-react";
import React from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Zaloguj się</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Hasło</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Albo kontynuuj z
                </span>
              </div>
            </div>
            <Button variant="outline" type="button">
              <Link href="/login/github" className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Nie masz jeszcze konta?{" "}
            <Link href="#" className="underline">
              Zapisz się
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/auth.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
