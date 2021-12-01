import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useCoins = (curr) => {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    fetcher
  );
  return {
    coins: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useCoins;
