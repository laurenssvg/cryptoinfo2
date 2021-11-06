import React from "react";

const CoinCard = ({ coin, setMyCoins, myCoins, showAll }) => {
  const coinExists = (label) => {
    return myCoins.some((coin) => coin.label === label);
  };

  return (
    <article
      onClick={() => {
        if (!coinExists(coin.label)) {
          return setMyCoins((prevCoins) => [...prevCoins, coin]);
        } else {
          return;
        }
      }}
      className={`flex p-4 border ${
        coinExists(coin.label) && showAll ? "bg-green-50" : ""
      } border-gray-200 space-x-4 m-5 rounded-xl shadow-sm hover:bg-blue-50 hover:cursor-pointer hover:transition-all ease-in-out hover:scale-105`}
    >
      <img
        src={coin.image}
        className="flex-none w-14 h-14 object-cover rounded-lg bg-gr"
      />
      <div className="flex justify-between min-w-0 relative flex-auto divide-x">
        <h2 className="flex text-lg font-semibold items-center">
          {coin.label}
        </h2>

        <div className="text-lg font-semibold pr-2 flex items-center pl-5">
          {coin.current_price.toLocaleString("en-GB", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 10,
          })}
        </div>
      </div>
      {coinExists(coin.label) && showAll ? (
        <div className="flex text-lg font-semibold items-center">+</div>
      ) : null}
    </article>
  );
};

export default CoinCard;
