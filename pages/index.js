import { useEffect, useState } from "react";
import Header from "../components/Header";
import useCoins from "../hooks/useCoins";
import useGlobalData from "../hooks/useGlobalData";
import CoinCard from "../components/CoinCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [myCoins, setMyCoins] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCoins = localStorage.getItem("myCoins");
      const initialValue = JSON.parse(savedCoins);
      return initialValue || [];
    }
  });
  const { globalData } = useGlobalData();
  const [filter, setFilter] = useState("");
  const { coins, isLoading } = useCoins("eur");
  const [filteredCoins, setFilteredCoins] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const myFilteredCoins = coins?.filter((coin) =>
    myCoins.find((myCoin) => myCoin.id == coin.id)
  );

  useEffect(() => {
    console.log(globalData);
    localStorage.setItem("myCoins", JSON.stringify(myCoins));
  }, [myCoins]);

  if (!isLoading) {
    return (
      <div className="bg-gray-100 dark:bg-[#252526] min-h-screen w-screen trans">
        <Header />
        <div className="max-w-3xl mx-auto md:max-w-xl lg:max-w-4xl">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredCoins={filteredCoins}
          />
          <div className="flex m-5">
            <button
              onClick={() => {
                setSearchQuery("");
                setFilteredCoins(null);
              }}
              className={`w-1/2 flex items-center justify-center rounded-full ${
                !filteredCoins ? "bg-gray-200 dark:bg-[#343435]" : ""
              } font-semibold p-5 m-2 hover:bg-gray-200 dark:bg-[#252526] dark:hover:bg-[#343435] dark:text-gray-300 hover:cursor-pointer hover:transition-all ease-in-out hover:scale-105`}
            >
              All coins
            </button>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilteredCoins(myFilteredCoins);
              }}
              className={`w-1/2 flex items-center justify-center rounded-full ${
                filteredCoins ? "bg-gray-200 dark:bg-[#343435]" : ""
              } font-semibold p-5 m-2 hover:bg-gray-200 dark:bg-[#252526] dark:hover:bg-[#343435] dark:text-gray-300 hover:cursor-pointer hover:transition-all ease-in-out hover:scale-105`}
            >
              My coins ({myCoins.length})
            </button>
          </div>
          <div className="dark:text-gray-300 font-light flex justify-center">
            The total market cap of all coins is currently:{" "}
            {globalData.data.total_market_cap.eur.toLocaleString("en-GB", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:grid-flow-row">
            {(filteredCoins ? filteredCoins : coins)
              .filter(
                (coin) =>
                  coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  coin.id.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((filteredCoin, index) => (
                <CoinCard
                  key={index}
                  coin={filteredCoin}
                  setMyCoins={setMyCoins}
                  myCoins={myCoins}
                  filteredCoins={filteredCoins}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else return <div>loading...</div>;
};

export default Home;
