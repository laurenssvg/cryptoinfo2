import Image from "next/image";
import {
  HiArrowDown,
  HiArrowUp,
  HiMinus,
  HiPlus,
  HiCheck,
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const CoinCard = ({ coin, setMyCoins, myCoins, filteredCoins }) => {
  const [expanded, setExpanded] = useState(false);
  const handleTap = () => {
    setExpanded(!expanded);
  };

  const displayAsCurrency = (coin) => {
    return coin.toLocaleString("en-GB", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 10,
    });
  };

  const addedToMyCoins = (name) => {
    return myCoins.some((coin) => coin.name == name);
  };
  const card = {
    expanded: {
      height: 250,
      transition: {
        duration: 0.125,
        type: "spring",
        damping: 10,
        mass: 0.6,
      },
    },
    notExpanded: {
      height: 130,
      transition: { duration: 0.125, type: "spring", damping: 10, mass: 0.6 },
    },
  };

  const text = {
    expanded: {
      y: 120,
      transition: { duration: 0.125, type: "spring", damping: 10, mass: 0.6 },
    },
    notExpanded: {
      y: 0,
      transition: { duration: 0.125, type: "spring", damping: 10, mass: 0.6 },
    },
  };

  const extraInfo = {
    expanded: {
      display: "block",
      scale: 1,
      x: 0,
      transition: {
        duration: 0.125,
        type: "spring",
        damping: 10,
        mass: 0.6,
        delay: 0.5,
      },
    },
    notExpanded: {
      display: "none",
      scale: 0.9,
      x: -25,
      transition: {
        duration: 0.125,
        type: "spring",
        damping: 10,
        mass: 0.6,
        delay: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.article
        animate={expanded ? "expanded" : "notExpanded"}
        onClick={handleTap}
        variants={card}
        className={`p-4 relative select-none cursor-pointer ${
          coin.price_change_percentage_24h > 0
            ? "bg-[#ddeec8] dark:bg-[#1f3623]"
            : "bg-[#c48585] dark:bg-[#3d1515]"
        } ${
          addedToMyCoins(coin.name) && !filteredCoins ? "border-green-500" : ""
        } m-3 lg:m-2 rounded-lg shadow-lg`}
      >
        <motion.div className="flex justify-between ">
          <div className="flex">
            <div className="w-14 h-14 relative">
              <Image
                className="flex w-14 h-14 rounded-lg"
                src={coin.image}
                layout="fill"
                objectFit="cover"
                alt="coin image"
              />
            </div>

            <div
              className={`flex text-lg font-semibold items-center pl-5 ${
                coin.price_change_percentage_24h > 0
                  ? "text-[#569049] dark:text-[#87c07b]"
                  : "text-[#8a2323] dark:text-[#bd6b6b]"
              } `}
            >
              {coin.name}
            </div>
          </div>
          <AnimatePresence>
            {addedToMyCoins(coin.name) && !filteredCoins ? (
              <motion.div
                className="flex absolute inset-x-0 top-0 justify-center text-xs"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{
                  duration: 0.125,
                  type: "spring",
                  damping: 10,
                  mass: 0.6,
                }}
              >
                <span className="flex bg-[#569049] rounded-md p-1 text-[#ddeec8]">
                  <HiCheck className="flex mt-0.5" />
                  Added to my coins
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div
            className={`flex text-lg font-semibold items-center ${
              coin.price_change_percentage_24h > 0
                ? "text-[#569049] dark:text-[#87c07b]"
                : "text-[#8a2323] dark:text-[#bd6b6b]"
            } `}
          >
            {displayAsCurrency(coin.current_price)}
          </div>
        </motion.div>
        {expanded && (
          <motion.div
            className="flex absolute"
            initial={"notExpanded"}
            animate={"expanded"}
            variants={extraInfo}
          >
            <ul
              className={`flex ${
                coin.price_change_percentage_24h > 0
                  ? "text-[#569049] dark:text-[#87c07b]"
                  : "text-[#491414] dark:text-[#bd6b6b]"
              } ${
                coin.price_change_percentage_24h > 0
                  ? "bg-[#ddeec8] dark:bg-[#1f3623]"
                  : "bg-[#c48585] dark:bg-[#3d1515]"
              }`}
            >
              <li className="flex   p-2 rounded-lg m-3">
                Market cap: {displayAsCurrency(coin.market_cap)}
              </li>
              <li className="flex  p-2 rounded-lg m-3">
                All-time High: {displayAsCurrency(coin.ath)}
              </li>
            </ul>
          </motion.div>
        )}
        <motion.div
          className="flex justify-between pt-5"
          animate={!expanded ? "notExpanded" : "expanded"}
          variants={text}
        >
          <div
            className={`flex ${
              coin.price_change_percentage_24h > 0
                ? "text-[#569049] dark:text-[#87c07b]"
                : "text-red-900 dark:text-red-300"
            } items-center`}
          >
            {coin.price_change_percentage_24h > 0 ? "+" : ""}
            {(coin.price_change_percentage_24h / 100).toLocaleString("en-GB", {
              style: "percent",
              minimumFractionDigits: 2,
            })}
          </div>
          <div
            className={`flex items-center text-[#406e35] dark:text-[#87c07b]`}
          >
            <HiArrowUp className="text-[#406e35] dark:text-[#87c07b]" />
            <sup className="mr-1">24h</sup>
            {displayAsCurrency(coin.high_24h)}
          </div>
          <div className="flex items-center text-[#8a2323] dark:text-[#bd6b6b]">
            <HiArrowDown className="text-[#8a2323] dark:text-[#bd6b6b]" />
            <sup className="mr-1">24h</sup>
            {displayAsCurrency(coin.low_24h)}
          </div>
          {!filteredCoins && !addedToMyCoins(coin.name) ? (
            <button className="flex items-center text-xl hover:scale-110 hover:transform duration-200 text-[#3a6331] dark:text-[#87c07b]">
              <HiPlus
                onClick={(e) => {
                  e.stopPropagation();
                  if (!addedToMyCoins(coin.name)) {
                    return setMyCoins((otherCoins) => [...otherCoins, coin]);
                  } else {
                    return;
                  }
                }}
              />
            </button>
          ) : (
            <button className="object-cover flex items-center text-xl hover:scale-110 hover:transform duration-200 text-[#8a2323] dark:text-[#bd6b6b]">
              <HiMinus
                onClick={(e) => {
                  e.stopPropagation();
                  setMyCoins(
                    myCoins.filter((myCoin) => coin.name !== myCoin.name)
                  );
                }}
              />
            </button>
          )}
        </motion.div>
      </motion.article>
    </AnimatePresence>
  );
};

export default CoinCard;
