"use client";

import { signIn } from "next-auth/react";
import Logo from "@/components/layout/Logo";

export default function LoginPage() {
  return (
    <div className="safe-px mx-auto flex max-w-md flex-col items-center px-4 pt-28 pb-20 sm:px-6 sm:pt-32">
      <Logo className="mb-8" priority />
      <div className="glass-strong w-full p-8 text-center">
        <h1 className="mb-2 text-2xl">Welcome to Draw Master</h1>
        <p className="section-subtitle mb-8">
          Sign in to upload names and run raffles.
        </p>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/upload" })}
          className="btn-primary w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
