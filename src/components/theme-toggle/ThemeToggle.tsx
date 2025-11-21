"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Flashlight, FlashlightOff } from "lucide-react";

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    //TODO :  add global context for setTheme = useContext() ;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      //TODO : setTheme("dark")
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
      //TODO : setTheme("light");
    }
  }, [setIsDark]);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    // TODO : setTheme(newTheme) ;
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <Button
      className="flex items-center rounded-full cursor-pointer"
      onClick={toggleTheme}
    >
      {isDark ? (
        <FlashlightOff className="stroke-1 stroke-primary-content" />
      ) : (
        <Flashlight className="stroke-1 stroke-primary-content" />
      )}
    </Button>
  );
}
