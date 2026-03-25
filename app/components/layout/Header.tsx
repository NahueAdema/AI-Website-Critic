"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/Button";
import { useLayoutEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar hydration mismatch
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useLayoutEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 right-0 p-4 z-50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </Button>
    </header>
  );
}
