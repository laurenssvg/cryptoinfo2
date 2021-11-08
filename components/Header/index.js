import React from "react";
import { GiTwoCoins } from "react-icons/gi";

const Header = () => {
  return (
    <nav className="flex items-center p-6">
      <div className="flex mx-auto items-center">
        <span className="flex items-center font-semibold text-xl tracking-tight">
          <GiTwoCoins className="text-4xl mx-2" />
          CryptoInfo
        </span>
      </div>
    </nav>
  );
};

export default Header;
