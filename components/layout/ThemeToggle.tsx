"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Inline script (in <head>) applies the saved theme before paint to avoid a flash. */
export const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}if(sessionStorage.getItem('emergency-dismissed')==='1'){d.classList.add('emergency-dismissed')}}catch(e){}})()`;

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark ?? false}
      className={cn("flex h-10 w-10 items-center justify-center rounded-full text-heading transition-colors hover:bg-primary/10", className)}
    >
      {dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
    </button>
  );
}
