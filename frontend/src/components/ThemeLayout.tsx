"use client";

import { Suspense, useEffect, useState } from "react";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { usePathname } from "next/navigation";
import ParamAlert from "./ParamAlert";
import { Toaster } from "./ui/toaster";
import Header from "./Header/Header";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import useMetamask from "@/hooks/useMetamask";

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const noHeaderPaths = ["/"];

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

  document.body.className = theme;

  return (
    <div>
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

      {noHeaderPaths.includes(pathname) ? (
        children
      ) : (
        <Header>{children}</Header>
      )}
    </div>
  );
}
