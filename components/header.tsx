"use client";

import { AmraLogo } from "./amra-logo";

export function Header() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center md:justify-start">
        <AmraLogo />
      </div>
    </header>
  );
}
