"use client";

import { Suspense, useEffect, useState } from "react";
import ThemeToggleButton from "../components/ThemeToggleButton";
import ParamAlert from "./ParamAlert";
import { Toaster } from "./ui/toaster";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("isDarkMode");
      if (storedTheme !== null) {
        setIsDarkMode(JSON.parse(storedTheme));
      }
      setIsClient(true);
    }
  }, []);

  const theme = isDarkMode ? "dark" : "light";

  if (!isClient) {
    return null;
  }

  // document.body.className = theme;

  return (
    <div
      className="w-full bg-linear-to-b from-[#0B0816] to-[#1F2245] min-h-screen"
      data-theme={theme}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ParamAlert />
      </Suspense>
      <Toaster />
      <ThemeToggleButton
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <ProgressBar
        height="4px"
        options={{
          showSpinner: false,
        }}
      />
      {children}
    </div>
  );
}
