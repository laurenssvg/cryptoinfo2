import { motion } from "framer-motion";
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

const formatPrice = (price, maxDigits) => {
  return price.toLocaleString("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDigits,
  });
};

const CardContentNormal = ({
  expanded,
  fullscreen,
  handleTap,
  coin,
  amount,
  myCoins,
  addedToMyCoins,
  filteredCoins,
  setMyCoins,
  disabled,
  setAmount,
  confirmAmount,
  setFullscreen,
}) => {
  return (
    <motion.article
      layout
      layoutId={`card${coin.name}`}
      animate={expanded ? "expanded" : "notExpanded"}
      initial={false}
      onClick={handleTap}
      variants={card}
      className={`p-4 relative select-none cursor-pointer ${
        coin.price_change_percentage_24h > 0
          ? "bg-[#ddeec8] dark:bg-[#1f3623]"
          : "bg-[#c48585] dark:bg-[#3d1515]"
      } m-3 lg:m-2 rounded-lg shadow-lg`}
    >
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
      <motion.div
        className={`absolute top-0 right-0 bg-transparent text-xl p-1 z-10 ${
          coin.price_change_percentage_24h > 0
            ? "bg-transparent text-[#569049] dark:text-[#87c07b]"
            : "bg-transparent text-[#8a2323] dark:text-[#bd6b6b]"
        } `}
        onClick={(e) => {
          e.stopPropagation();
          setFullscreen(!fullscreen);
        }}
      >
        <HiInformationCircle />
      </motion.div>
      <motion.div className="flex justify-between">
        <motion.div className="flex">
          <motion.div className="w-14 h-14 relative">
            <Image
              className="flex rounded-lg"
              src={coin.image}
              layout="fill"
              objectFit="cover"
              alt="coin image"
            />
          </motion.div>

          <motion.div
            className={`flex text-lg font-semibold items-center pl-5 ${
              coin.price_change_percentage_24h > 0
                ? "text-[#569049] dark:text-[#87c07b]"
                : "text-[#8a2323] dark:text-[#bd6b6b]"
            } `}
          >
            {coin.name}
          </motion.div>
        </motion.div>
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
            <motion.span className="flex bg-[#569049] rounded-md p-1 text-[#ddeec8]">
              <HiCheck className="flex mt-0.5" />
              Added to my coins
            </motion.span>
          </motion.div>
        ) : null}{" "}
        <motion.div
          className={`flex text-lg font-semibold items-center ${
            coin.price_change_percentage_24h > 0
              ? "text-[#569049] dark:text-[#87c07b]"
              : "text-[#8a2323] dark:text-[#bd6b6b]"
          } `}
        >
          {formatPrice(coin.current_price, 8)}
        </motion.div>
      </motion.div>
      {expanded && addedToMyCoins(coin.name) && (
        <motion.div
          className="flex flex-col absolute inset-x-0 bottom-16"
          initial={"notExpanded"}
          animate={"expanded"}
          variants={extraInfo}
        >
          <motion.div className={`flex absolute bottom-14 self-center`}>
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
            <motion.button
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
            </motion.button>
          </motion.div>
          <motion.span className="flex mx-auto text-xl">=</motion.span>
          <motion.div
            className={`flex text-xl font-semibold mx-auto ${
              coin.price_change_percentage_24h > 0
                ? "text-[#569049] dark:text-[#87c07b]"
                : "text-[#8a2323] dark:text-[#bd6b6b]"
            }`}
          >
            {amount
              ? formatPrice(coin.current_price * amount, 2)
              : `${formatPrice(0)}`}
          </motion.div>
        </motion.div>
      )}
      <motion.div
        className="flex justify-between pt-5"
        initial={false}
        animate={!expanded ? "notExpanded" : "expanded"}
        variants={stats}
      >
        <motion.div
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={expanded ? "expanded" : "notExpanded"}
          variants={extraInfo}
          className={`flex items-center text-[#406e35] dark:text-[#87c07b]`}
        >
          <HiArrowUp className="text-[#406e35] dark:text-[#87c07b]" />
          <motion.sup className="mr-1">24h</motion.sup>
          {formatPrice(coin.high_24h, 8)}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={expanded ? "expanded" : "notExpanded"}
          variants={extraInfo}
          className="flex items-center text-[#8a2323] dark:text-[#bd6b6b]"
        >
          <HiArrowDown className="text-[#8a2323] dark:text-[#bd6b6b]" />
          <motion.sup className="mr-1">24h</motion.sup>
          {formatPrice(coin.low_24h, 8)}
        </motion.div>

        {!filteredCoins && !addedToMyCoins(coin.name) ? (
          <motion.button className="flex items-center text-xl hover:scale-110 hover:transform duration-200 text-[#3a6331] dark:text-[#87c07b]">
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
          </motion.button>
        ) : (
          <motion.button className="object-cover flex items-center text-xl hover:scale-110 hover:transform duration-200 text-[#8a2323] dark:text-[#bd6b6b]">
            <HiMinus
              onClick={(e) => {
                e.stopPropagation();
                setMyCoins(
                  myCoins.filter((myCoin) => coin.name !== myCoin.name)
                );
              }}
            />
          </motion.button>
        )}
      </motion.div>
    </motion.article>
  );
};

export default CardContentNormal;
