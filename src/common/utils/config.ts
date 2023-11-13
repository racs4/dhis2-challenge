/**
 * The base URL for fetching data from the server.
 */
export const BASE_URL =
  "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/";

/**
 * Fetches data from the server.
 * @param url - The URL to fetch data from.
 * @returns A promise that resolves to the fetched data.
 */
export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(BASE_URL + url);
  return await res.json();
}
