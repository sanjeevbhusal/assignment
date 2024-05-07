import { useEffect, useState } from "react";
import { logError } from "../utils";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const value = localStorage.getItem(key);

    if (!value) {
      return initialValue;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      logError(error, `Error fetching value for key "${key}" in localStorage`);

      return initialValue;
    }
  });

  // Update localStorage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  function setLocalStorageValue(updatedValue: T) {
    console.log({ updatedValue });
    try {
      setValue(updatedValue);
    } catch (error) {
      logError(error, `Error storing value for key "${key}" in localStorage:`);
    }
  }

  return [value, setLocalStorageValue];
}
