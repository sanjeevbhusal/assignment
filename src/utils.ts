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
