import React from "react";
import { GiTwoCoins } from "react-icons/gi";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-between font-semibold text-xl dark:text-gray-300 p-6 mx-5">
      <button className="flex text-4xl mx-2">
        <GiTwoCoins />
      </button>
      <span className="flex select-none">CryptoInfo</span>
      <button
        className="flex text-3xl"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <MdOutlineDarkMode /> : <MdDarkMode />}
      </button>
    </div>
  );
};

export default Header;
