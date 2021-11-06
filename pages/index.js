import { useState } from "react";
import Header from "../components/Header";
import useSWR from "swr";
import CoinCard from "../components/CoinCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const [myCoins, setMyCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
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
      <div className="container mx-auto">
        <input
          className={`focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-md text-black placeholder-gray-500 border border-gray-200 rounded-lg pl-5 py-3
          `}
          type="text"
          aria-label="Filter projects"
          placeholder="Search coins.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {coins
          .filter(
            (coin) =>
              coin.label.toLowerCase().includes(searchQuery) ||
              coin.value.toLowerCase().includes(searchQuery)
          )
          .map((filteredCoin) => (
            <CoinCard key={filteredCoin.value} {...filteredCoin} />
          ))}
      </div>
    </div>
  );
};

export default Home;
