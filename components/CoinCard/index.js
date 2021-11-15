import Image from "next/image";
import {
  HiArrowDown,
  HiArrowUp,
  HiMinus,
  HiPlus,
  HiCheck,
  HiLockClosed,
  HiLockOpen,
  HiInformationCircle,
} from "react-icons/hi";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";

const CoinCard = ({ coin, setMyCoins, myCoins, filteredCoins }) => {
  const [expanded, setExpanded] = useState(false);
  const [amount, setAmount] = useState(() => {
    const found = JSON.parse(localStorage.getItem("myCoins")).find(
      (myCoin) => myCoin.id === coin.id
    );
    return found?.amount || "";
  });
  const [disabled, setDisabled] = useState(() => (amount ? true : false));

  const handleTap = () => {
    setExpanded(!expanded);
  };

  const confirmAmount = () => {
    const updatedCoins = myCoins.map((myCoin) =>
      myCoin.id === coin.id ? { ...myCoin, amount: amount } : myCoin
    );
    setMyCoins(updatedCoins);
    setDisabled(!disabled);
  };

  const formatPrice = (price, maxDigits) => {
    return price.toLocaleString("en-GB", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: maxDigits,
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

  const stats = {
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
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.125,
        type: "spring",
        damping: 10,
        mass: 0.6,
        delay: 0.2,
      },
    },
    notExpanded: {
      opacity: 0,
      scale: 0.6,
      transition: {
        duration: 0.125,
        type: "spring",
        damping: 10,
        mass: 0.6,
        delay: 0.2,
      },
    },
  };

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.article
          layout
          animate={expanded ? "expanded" : "notExpanded"}
          onClick={handleTap}
          variants={card}
          className={`p-4 relative select-none cursor-pointer ${
            coin.price_change_percentage_24h > 0
              ? "bg-[#ddeec8] dark:bg-[#1f3623]"
              : "bg-[#c48585] dark:bg-[#3d1515]"
          } m-3 lg:m-2 rounded-lg shadow-lg`}
        >
          <AnimatePresence>
            {amount && !expanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{
                  duration: 0.125,
                  type: "spring",
                  damping: 10,
                  mass: 0.6,
                  delay: 0.2,
                }}
                className={`flex absolute bottom-4 inset-x-0 justify-center font-semibold text-xl ${
                  coin.price_change_percentage_24h > 0
                    ? "text-[#569049] dark:text-[#87c07b]"
                    : "text-[#8a2323] dark:text-[#bd6b6b]"
                }`}
              >
                {formatPrice(amount * coin.current_price, 2)}
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className={`absolute top-0 right-0 bg-transparent text-xl p-1 z-10 ${
              coin.price_change_percentage_24h > 0
                ? "bg-transparent text-[#124b1b] dark:text-[#87c07b]"
                : "bg-transparent text-[#702626] dark:text-[#bd6b6b]"
            } `}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <HiInformationCircle />
          </div>
          <motion.div className="flex justify-between">
            <div className="flex">
              <div className="w-14 h-14 relative">
                <Image
                  className="flex rounded-lg"
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
              {formatPrice(coin.current_price, 8)}
            </div>
          </motion.div>
          {expanded && addedToMyCoins(coin.name) && (
            <motion.div
              className="flex flex-col absolute inset-x-0 bottom-16"
              initial={"notExpanded"}
              animate={"expanded"}
              variants={extraInfo}
            >
              <div className={`flex absolute bottom-14 self-center`}>
                <motion.input
                  className={`${
                    coin.price_change_percentage_24h > 0
                      ? "dark:bg-[#ddeec8] bg-[#68a55b] placeholder-[#ddeec8] text-[#ddeec8] dark:placeholder-[#124b1b] dark:text-[#124b1b]"
                      : "dark:bg-[#c48585] bg-[#8a2f2f] placeholder-[#eec9c8] text-[#eec9c8] dark:placeholder-[#702626] dark:text-[#702626]"
                  } py-2 rounded-lg spin-button-none focus:outline-none text-center`}
                  placeholder="Enter amount"
                  type="number"
                  disabled={disabled}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className={`absolute text-xl p-1 right-0 ${
                    coin.price_change_percentage_24h > 0
                      ? "dark:bg-[#ddeec8] bg-[#68a55b] placeholder-[#ddeec8] text-[#ddeec8] dark:placeholder-[#124b1b] dark:text-[#124b1b]"
                      : "dark:bg-[#c48585] bg-[#8a2f2f] placeholder-[#eec9c8] text-[#eec9c8] dark:placeholder-[#702626] dark:text-[#702626]"
                  } rounded-md `}
                  onClick={(e) => {
                    confirmAmount();
                    e.stopPropagation();
                  }}
                >
                  {disabled ? (
                    <HiLockClosed className="text-3xl" />
                  ) : (
                    <HiLockOpen className="text-3xl" />
                  )}
                </button>
              </div>
              <span className="flex mx-auto text-xl">=</span>
              <div
                className={`flex text-xl font-semibold mx-auto ${
                  coin.price_change_percentage_24h > 0
                    ? "text-[#569049] dark:text-[#87c07b]"
                    : "text-[#8a2323] dark:text-[#bd6b6b]"
                }`}
              >
                {amount
                  ? formatPrice(coin.current_price * amount, 2)
                  : `${formatPrice(0)}`}
              </div>
            </motion.div>
          )}
          <motion.div
            className="flex justify-between pt-5"
            animate={!expanded ? "notExpanded" : "expanded"}
            variants={stats}
          >
            <div
              className={`flex ${
                coin.price_change_percentage_24h > 0
                  ? "text-[#569049] dark:text-[#87c07b]"
                  : "text-red-900 dark:text-red-300"
              } items-center`}
            >
              {coin.price_change_percentage_24h > 0 ? "+" : ""}
              {(coin.price_change_percentage_24h / 100).toLocaleString(
                "en-GB",
                {
                  style: "percent",
                  minimumFractionDigits: 2,
                }
              )}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={expanded ? "expanded" : "notExpanded"}
              variants={extraInfo}
              className={`flex items-center text-[#406e35] dark:text-[#87c07b]`}
            >
              <HiArrowUp className="text-[#406e35] dark:text-[#87c07b]" />
              <sup className="mr-1">24h</sup>
              {formatPrice(coin.high_24h, 8)}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={expanded ? "expanded" : "notExpanded"}
              variants={extraInfo}
              className="flex items-center text-[#8a2323] dark:text-[#bd6b6b]"
            >
              <HiArrowDown className="text-[#8a2323] dark:text-[#bd6b6b]" />
              <sup className="mr-1">24h</sup>
              {formatPrice(coin.low_24h, 8)}
            </motion.div>

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
    </AnimateSharedLayout>
  );
};

export default CoinCard;
