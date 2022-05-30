import axios from "axios";
import { parseCookies } from "nookies";

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["tecnoprest.token"]}`,
    },
  });

  return api;
}
