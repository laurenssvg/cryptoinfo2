import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useGlobalData = () => {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/global`,
    fetcher
  );
  return {
    globalData: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGlobalData;
