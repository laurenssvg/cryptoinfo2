import React from "react";
import { GiTwoCoins } from "react-icons/gi";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-between font-semibold text-xl dark:text-gray-300 p-6 mx-5">
      <GiTwoCoins className="flex text-4xl mx-2" />
      <span className="flex select-none">CryptoInfo</span>
      <button
        className="flex"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <MdOutlineDarkMode /> : <MdDarkMode />}
      </button>
    </div>
  );
};

export default Header;
