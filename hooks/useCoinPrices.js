import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useCoinPrices = (id) => {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=1
    `,
    fetcher
  );
  return {
    coinPrices: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useCoinPrices;
