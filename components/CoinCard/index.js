import Image from "next/image";
import { HiArrowDown, HiArrowUp, HiMinus, HiPlus } from "react-icons/hi";

const CoinCard = ({ coin, setMyCoins, myCoins, filteredCoins }) => {
  const addedToMyCoins = (name) => {
    return myCoins.some((coin) => coin.name == name);
  };

  return (
    <article
      className={`p-4 ${
        coin.price_change_percentage_24h > 0
          ? "bg-[#ddeec8] dark:bg-[#1f3623]"
          : "bg-[#e29898] dark:bg-[#3d1515]"
      } ${
        addedToMyCoins(coin.name) && !filteredCoins ? "border-green-500" : ""
      } m-3 lg:m-2 rounded-lg shadow-lg`}
    >
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-14 h-14 relative">
            <Image
              className="flex w-14 h-14 object-cover rounded-lg"
              src={coin.image}
              layout="fill"
              objectFit="cover"
              alt="coin image"
            />
          </div>

          <h2
            className={`flex text-lg font-semibold items-center pl-5 ${
              coin.price_change_percentage_24h > 0
                ? "text-[#569049] dark:text-[#87c07b]"
                : "text-[#8a2323] dark:text-[#bd6b6b]"
            } `}
          >
            {coin.name}
          </h2>
        </div>

        <div
          className={`flex text-lg font-semibold items-center ${
            coin.price_change_percentage_24h > 0
              ? "text-[#569049] dark:text-[#87c07b]"
              : "text-[#8a2323] dark:text-[#bd6b6b]"
          } `}
        >
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
              ? "text-[#569049] dark:text-[#87c07b]"
              : "text-red-900 dark:text-red-300"
          } pt-5`}
        >
          {(coin.price_change_percentage_24h / 100).toLocaleString("en-GB", {
            style: "percent",
            minimumFractionDigits: 2,
          })}
        </div>
        <div
          className={`flex pt-5 mx-5 items-center text-[#569049] dark:text-[#87c07b]`}
        >
          <HiArrowUp style={{ color: "green" }} />
          {coin.high_24h.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 10,
          })}
        </div>
        <div className="flex pt-5 items-center text-[#8a2323] dark:text-[#bd6b6b]">
          <HiArrowDown style={{ color: "red" }} />
          {coin.low_24h.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 10,
          })}
        </div>
        {!filteredCoins && !addedToMyCoins(coin.name) ? (
          <button className="flex pt-5 items-center text-xl hover:scale-110 hover:transform duration-200 text-[#3a6331] dark:text-[#87c07b]">
            <HiPlus
              onClick={() => {
                if (!addedToMyCoins(coin.name)) {
                  return setMyCoins((otherCoins) => [...otherCoins, coin]);
                } else {
                  return;
                }
              }}
            />
          </button>
        ) : (
          <button className="flex pt-5 items-center text-xl hover:scale-110 hover:transform duration-200 text-[#8a2323] dark:text-[#bd6b6b]">
            <HiMinus
              onClick={() => {
                setMyCoins(
                  myCoins.filter((myCoin) => coin.name !== myCoin.name)
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
