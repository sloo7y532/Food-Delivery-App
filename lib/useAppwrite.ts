/**
 * Custom React Hook for Appwrite API Calls
 *
 * This hook provides a standardized way to handle asynchronous Appwrite operations
 * with loading states, error handling, and refetch capabilities. It's designed to
 * work with any Appwrite function that returns a Promise.
 */

import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

/**
 * Configuration options for the useAppwrite hook
 *
 * @template T - The type of data returned by the API call
 * @template P - The type of parameters passed to the API function
 */
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>; // The Appwrite function to call
  params?: P; // Initial parameters for the function
  skip?: boolean; // Whether to skip the initial API call
}

/**
 * Return type for the useAppwrite hook
 *
 * @template T - The type of data returned by the API call
 * @template P - The type of parameters for refetch operations
 */
interface UseAppwriteReturn<T, P> {
  data: T | null; // The fetched data or null
  loading: boolean; // Whether an API call is in progress
  error: string | null; // Error message if the call failed
  refetch: (newParams?: P) => Promise<void>; // Function to refetch data with new params
}

/**
 * Custom hook for handling Appwrite API calls
 *
 * Provides automatic loading states, error handling, and data management
 * for any Appwrite function. Includes support for:
 * - Automatic initial data fetching
 * - Manual refetching with new parameters
 * - Loading state management
 * - Error handling with user alerts
 *
 * @example
 * ```typescript
 * // Fetch menu items with category filter
 * const { data: menuItems, loading, error, refetch } = useAppwrite({
 *   fn: getMenu,
 *   params: { category: "Burgers", query: "" }
 * });
 *
 * // Refetch with different parameters
 * refetch({ category: "Pizza", query: "margherita" });
 * ```
 */
const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  // State management for API call results
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip); // Start loading unless skipped
  const [error, setError] = useState<string | null>(null);

  /**
   * Core function to fetch data from Appwrite
   *
   * Handles the complete lifecycle of an API call including
   * loading states, error handling, and data updates.
   */
  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        // Execute the Appwrite function with provided parameters
        const result = await fn({ ...fetchParams });
        setData(result);
      } catch (err: unknown) {
        // Handle and format errors consistently
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage); // Show user-friendly error alert
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  /**
   * Automatic initial data fetch
   *
   * Fetches data on component mount unless explicitly skipped.
   * Useful for loading data when a component first renders.
   */
  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  /**
   * Manual refetch function
   *
   * Allows components to refetch data with new parameters.
   * Useful for search, filtering, or refreshing data.
   */
  const refetch = async (newParams?: P) => await fetchData(newParams!);

  return { data, loading, error, refetch };
};

export default useAppwrite;
