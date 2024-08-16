import React, { useState } from "react";
import { HeaderContext } from "../Context";

export const HeaderProvider = ({ children }) => {
  const preference = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [navVisible, setNavVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode")
      ? JSON.parse(localStorage.getItem("darkMode"))
      : preference
  );
  const [isArabic, setIsArabic] = useState(false);

  const handleNavToggle = () => {
    setNavVisible(!navVisible);
  };

  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  return (
    <HeaderContext.Provider
      value={{
        navVisible,
        setNavVisible,
        handleNavToggle,
        darkMode,
        setDarkMode,
        handleThemeToggle,
        isArabic,
        setIsArabic,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
