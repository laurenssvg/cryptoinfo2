import React from "react";
import { HiArrowDown, HiArrowUp, HiMinus, HiPlus } from "react-icons/hi";

const CoinCard = ({ coin, setMyCoins, myCoins, showAll }) => {
  const addedToMyCoins = (label) => {
    return myCoins.some((coin) => coin.label === label);
  };

  return (
    <article
      className={`p-4 border ${
        addedToMyCoins(coin.label) && showAll ? "bg-green-50" : "bg-white"
      } border-gray-200 m-2 rounded-lg shadow-md`}
    >
      <div className="flex justify-between">
        <div className="flex">
          <img
            className="flex w-14 h-14 object-cover rounded-lg"
            src={coin.image}
          />

          <h2 className="flex text-lg font-semibold items-center pl-5">
            {coin.label}
          </h2>
        </div>

        <div className="flex text-lg font-semibold items-center">
          {coin.current_price.toLocaleString("en-GB", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 10,
          })}
        </div>
      </div>
      <div className="flex justify-between">
        <div
          className={`${
            coin.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          } pt-5`}
        >
          {(coin.price_change_percentage_24h / 100).toLocaleString("en-GB", {
            style: "percent",
            minimumFractionDigits: 2,
          })}
        </div>
        <div className="flex pt-5 mx-5 items-center">
          <HiArrowUp style={{ color: "green" }} />
          {coin.high_24h.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 10,
          })}
        </div>
        <div className="flex pt-5 items-center">
          <HiArrowDown style={{ color: "red" }} />
          {coin.low_24h.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 10,
          })}
        </div>
        {showAll ? (
          <button className="flex pt-5 items-center text-xl hover:scale-110 hover:transform duration-200">
            <HiPlus
              onClick={() => {
                if (!addedToMyCoins(coin.label)) {
                  return setMyCoins((prevCoins) => [...prevCoins, coin]);
                } else {
                  return;
                }
              }}
            />
          </button>
        ) : (
          <button className="flex pt-5 items-center text-xl hover:scale-110 hover:transform duration-200">
            <HiMinus
              onClick={() => {
                setMyCoins(
                  myCoins.filter((myCoin) => coin.label !== myCoin.label)
                );
              }}
            />
          </button>
        )}
      </div>
    </article>
  );
};

export default CoinCard;
