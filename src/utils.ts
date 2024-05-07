import { z } from "zod";
import { IS_PROD_ENV } from "./constants";

export function logError(error: unknown, userFriendlyMessage?: string) {
  let errorMessage = userFriendlyMessage;
  let errorDetails;

  if (error instanceof z.ZodError) {
    errorMessage = errorMessage || "Zod validation failed";
    errorDetails = error.issues;
  } else {
    errorMessage = userFriendlyMessage || "An unexpected error occurred";
  }

  if (IS_PROD_ENV) {
    // TODO: implement error logging functionalities like Sentry.
  } else {
    console.error(errorMessage, errorDetails);
  }
}

export function fetchValueFromLocalStorage<T>(
  key: string,
  fallbackValue?: T
): T | undefined {
  const value = localStorage.getItem(key);

  if (!value) {
    return fallbackValue;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    logError(error, `Error fetching value for key "${key}" in localStorage`);

    return fallbackValue;
  }
}

export function storeValueInLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    logError(error, `Error storing value for key "${key}" in localStorage:`);
  }
}
