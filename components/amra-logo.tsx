"use client";

interface AmraLogoProps {
  className?: string;
}

export function AmraLogo({ className = "" }: AmraLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg" />
        <span className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold text-lg">
          A
        </span>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        amra
      </span>
    </div>
  );
}
