import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import useCoinInfo from "../../hooks/useCoinInfo";

const formatPrice = (price, maxDigits) => {
  return price.toLocaleString("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDigits,
  });
};

const CardContentFull = ({
  expanded,
  fullscreen,
  coin,
  amount,
  setFullscreen,
}) => {
  const { coinInfo } = useCoinInfo(coin.id);

  return (
    <motion.article
      layout
      layoutId={`card${coin.name}`}
      onClick={() => setFullscreen(!fullscreen)}
      className={`p-4 fixed top-0 left-0 w-full h-full select-none cursor-pointer ${
        coin.price_change_percentage_24h > 0
          ? "bg-[#ddeec8] dark:bg-[#1f3623]"
          : "bg-[#c48585] dark:bg-[#3d1515]"
      } rounded-lg shadow-lg z-50`}
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
        className={`absolute top-0 right-0 bg-transparent text-3xl p-1 z-10 ${
          coin.price_change_percentage_24h > 0
            ? "bg-transparent text-[#569049] dark:text-[#87c07b]"
            : "bg-transparent text-[#8a2323] dark:text-[#bd6b6b]"
        } `}
        onClick={(e) => {
          e.stopPropagation();
          setFullscreen(!fullscreen);
        }}
      >
        <HiX />
      </motion.div>
      <motion.div className="flex flex-col justify-between mt-10 items-center">
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
          className={`flex text-4xl font-semibold items-center ${
            coin.price_change_percentage_24h > 0
              ? "text-[#569049] dark:text-[#87c07b]"
              : "text-[#8a2323] dark:text-[#bd6b6b]"
          } `}
        >
          {coin.name}
        </motion.div>
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
    </motion.article>
  );
};

export default CardContentFull;