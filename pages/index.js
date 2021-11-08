import { useEffect, useState } from "react";
import Header from "../components/Header";
import useCoins from "../hooks/useCoins";
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
  const { coins, isLoading } = useCoins("eur");
  const [filteredCoins, setFilteredCoins] = useState();
  const [showAll, setShowAll] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const myFilteredCoins = coins?.filter((coin) => coin.id == "bitcoin");

  useEffect(() => {
    localStorage.setItem("myCoins", JSON.stringify(myCoins));
  }, [myCoins]);

  if (!isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen w-screen">
        <Header />
        <div className="max-w-3xl mx-auto md:max-w-xl lg:max-w-4xl">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showAll={showAll}
          />
          <div className="flex m-5">
            <button
              onClick={() => {
                setSearchQuery("");
                setFilteredCoins(null);
              }}
              className={`w-1/2 flex items-center justify-center rounded-full ${
                showAll ? "bg-gray-100" : ""
              } font-semibold p-5 m-2 hover:bg-gray-100 hover:cursor-pointer hover:transition-all ease-in-out hover:scale-105`}
            >
              All coins
            </button>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilteredCoins(myFilteredCoins);
              }}
              className={`w-1/2 flex items-center justify-center rounded-full ${
                !showAll ? "bg-gray-100" : ""
              } font-semibold p-5 m-2 hover:bg-gray-100 hover:cursor-pointer hover:transition-all ease-in-out hover:scale-105`}
            >
              My coins ({myCoins.length})
            </button>
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
                  showAll={showAll}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else return <div>loading...</div>;
};

export default Home;
