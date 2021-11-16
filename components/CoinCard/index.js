import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import CardContentNormal from "../CardContentNormal";
import CardContentFull from "../CardContentFull";

const CoinCard = ({ coin, setMyCoins, myCoins, filteredCoins }) => {
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
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

  const addedToMyCoins = (name) => {
    return myCoins.some((coin) => coin.name == name);
  };

  const confirmAmount = () => {
    const updatedCoins = myCoins.map((myCoin) =>
      myCoin.id === coin.id ? { ...myCoin, amount: amount } : myCoin
    );
    setMyCoins(updatedCoins);
    setDisabled(!disabled);
  };

  return (
    <AnimateSharedLayout>
      {!fullscreen ? (
        <CardContentNormal
          expanded={expanded}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          handleTap={handleTap}
          coin={coin}
          amount={amount}
          myCoins={myCoins}
          addedToMyCoins={addedToMyCoins}
          filteredCoins={filteredCoins}
          setMyCoins={setMyCoins}
          disabled={disabled}
          setAmount={setAmount}
          confirmAmount={confirmAmount}
        />
      ) : (
        <CardContentFull
          expanded={expanded}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          handleTap={handleTap}
          coin={coin}
          amount={amount}
        />
      )}
    </AnimateSharedLayout>
  );
};

export default CoinCard;
