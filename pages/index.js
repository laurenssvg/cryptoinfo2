import { useState } from "react";
import Header from "../components/Header";
import useSWR from "swr";
import CoinCard from "../components/CoinCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const [myCoins, setMyCoins] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error } = useSWR(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    fetcher,
    { refreshInterval: 30000 }
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const coins = data.map((coin) => ({
    image: `${coin.image}`,
    value: `${coin.id}`,
    label: `${coin.name}`,
    current_price: coin.current_price,
  }));

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto">
        <input
          className={`focus:border-light-blue-500 focus:ring-1 focus:ring-gray-300 focus:outline-none w-full text-md text-black placeholder-gray-500 border border-gray-200 rounded-lg pl-5 py-3
          `}
          type="text"
          aria-label="Filter projects"
          placeholder={`Search ${!showAll ? "my " : ""}coins..`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex m-5">
          <button
            onClick={() => setShowAll(true)}
            className={`w-1/2 flex items-center justify-center rounded-full ${
              showAll ? "bg-blue-50" : ""
            } bg-white font-semibold p-5 m-2 hover:bg-blue-50 hover:cursor-pointer hover:transition-all ease-in-out hover:scale-105`}
          >
            All coins
          </button>
          <button
            onClick={() => setShowAll(false)}
            className={`w-1/2 flex items-center justify-center rounded-full ${
              !showAll ? "bg-blue-50" : ""
            } bg-white font-semibold p-5 m-2 hover:bg-blue-50 hover:cursor-pointer hover:transition-all ease-in-out hover:scale-105`}
          >
            My coins ({myCoins.length})
          </button>
        </div>
        {(showAll ? coins : myCoins)
          .filter(
            (coin) =>
              coin.label.toLowerCase().includes(searchQuery) ||
              coin.value.toLowerCase().includes(searchQuery)
          )
          .map((filteredCoin, index) => (
            <CoinCard
              key={index}
              coin={filteredCoin}
              setMyCoins={setMyCoins}
              myCoins={myCoins}
              showAll={showAll}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
