import { useCallback, useEffect, useState } from "react";
import { fetcher } from "../utils/config";

// Store is a global variable that will store the memoized data
// so that we can use it later without fetching it again
// 'any' is used as the type because we don't know what type of data
const store: { [key: string | number]: any } = {};

/**
 * A custom hook for fetching data from an API endpoint.
 *
 * @template D The type of data returned by the API endpoint.
 * @param {object} options An object containing the options for the hook.
 * @param {string} options.url The URL of the API endpoint to fetch data from.
 * @param {(string|number)} [options.memo] An optional memo key used to store the fetched data in.
 * @param {(data: D) => void} [options.whenLoad] An optional callback function to execute when the data is loaded.
 * @returns An object containing the fetched data, a function to update the data, a boolean indicating whether the data is currently being loaded, and a boolean indicating whether an error occurred while fetching the data.
 */
export function useFetch<D>({
  url,
  memo,
  whenLoad,
}: {
  url: string;
  memo?: string | number;
  whenLoad?: (data: D) => void;
}) {
  const [data, setData] = useState({} as D);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetcher<D>(url);
      whenLoad && whenLoad(data);
      setData(data);
      if (memo !== undefined) {
        store[memo] = data;
      }
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [url, memo, whenLoad]);

  useEffect(() => {
    if (memo !== undefined && store[memo]) {
      setData(store[memo]);
      return;
    }

    fetchData();

    return () => {
      setError(false);
      setLoading(false);
    };
  }, [memo]);

  return { data, setData, loading, error };
}
