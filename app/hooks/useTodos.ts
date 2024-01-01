import { API_URL } from "@/staticValues/url";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export const useTodos = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `${API_URL}/todos`,
    fetcher
  );

  return {
    todos: data,
    isLoading,
    error,
    mutate,
  };
};
