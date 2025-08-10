// src/components/ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} aria-label="Toggle Theme" className="theme-toggle">
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggle;
