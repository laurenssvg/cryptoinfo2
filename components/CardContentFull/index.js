import { motion } from "framer-motion";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import useCoinInfo from "../../hooks/useCoinInfo";
import useCoinPrices from "../../hooks/useCoinPrices";
import parse from "html-react-parser";
import { LineChart, Line } from "recharts";
import { useEffect, useState } from "react";

const formatPrice = (price, maxDigits) => {
  return price.toLocaleString("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDigits,
  });
};

const CardContentFull = ({ fullscreen, coin, setFullscreen }) => {
  const { coinInfo, isLoading } = useCoinInfo(coin.id);
  const { coinPrices } = useCoinPrices(coin.id);
  const [priceData, setPriceData] = useState([]);
  const description = coinInfo?.description.en.split(". ", 1).toLocaleString();

  const transformArrayOfArrays = (source, ...names) => {
    const defaultName = (i) => "field" + i;
    return source.map((a) => {
      return a.reduce((r, v, i) => {
        r[i < names.length ? names[i] : defaultName(i)] = v;
        return r;
      }, {});
    });
  };

  useEffect(() => {
    if (coinPrices) {
      const prices = transformArrayOfArrays(coinPrices.prices, "time", "price");
      setPriceData(prices);
    }
  }, []);

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
        <motion.div
          className="w-14 h-14 relative"
          layoutId={`image${coin.name}`}
        >
          <Image
            className="flex rounded-lg"
            src={coin.image}
            layout="fill"
            objectFit="cover"
            alt="coin image"
          />
        </motion.div>

        <motion.div
          layoutId={`name${coin.name}`}
          className={`flex text-4xl font-semibold items-center ${
            coin.price_change_percentage_24h > 0
              ? "text-[#569049] dark:text-[#87c07b]"
              : "text-[#8a2323] dark:text-[#bd6b6b]"
          } `}
        >
          {coin.name}
        </motion.div>
        <motion.div
          layout
          layoutId={`price${coin.name}`}
          className={`flex text-lg font-semibold items-center ${
            coin.price_change_percentage_24h > 0
              ? "text-[#569049] dark:text-[#87c07b]"
              : "text-[#8a2323] dark:text-[#bd6b6b]"
          } `}
        >
          {formatPrice(coin.current_price, 8)}
        </motion.div>
      </motion.div>
      {description && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          className="flex text-center justify-center"
        >
          {parse(description)}.
        </motion.div>
      )}
    </motion.article>
  );
};

export default CardContentFull;
