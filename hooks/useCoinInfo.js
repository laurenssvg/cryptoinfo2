import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useCoinInfo = (id) => {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${id}`,
    fetcher
  );
  return {
    coinInfo: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useCoinInfo;
