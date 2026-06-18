"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="safe-px mx-auto flex max-w-md flex-col items-center px-4 py-20 sm:px-6">
      <div className="glass-strong w-full p-8 text-center">
        <h1 className="mb-2 text-2xl">Welcome to SpinDraw</h1>
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
