import useSWR from "swr";
import { api } from "../lib/axios/apiClient";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function useGet(url?: string) {
  return useSWR(url, fetcher);
}
