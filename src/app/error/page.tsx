"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


function ErrorMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
    <Link href="/">
        Go back to home
      </Link>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorMessage />
    </Suspense>
  );
}