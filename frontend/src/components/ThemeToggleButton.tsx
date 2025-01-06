"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "./ui/button";
interface Props {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export default function ThemeToggleButton({
  isDarkMode,
  setIsDarkMode,
}: Props) {
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
  };

  return (
    <div className="fixed bottom-10 right-10">
      <Button
        variant="primary"
        onClick={handleToggle}
        className="w-10 h-10 p-0 min-w-0 rounded-full"
      >
        {isDarkMode ? (
          <FaSun style={{ fontSize: "24px" }} />
        ) : (
          <FaMoon style={{ fontSize: "18px" }} />
        )}
      </Button>
    </div>
  );
}
