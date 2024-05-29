"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

function UserProfile() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button>Zaloguj się</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

export default UserProfile;
