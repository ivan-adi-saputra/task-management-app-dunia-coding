import { AxiosError } from "axios";

export function handleError(err: unknown): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as any;

    let message = data?.message || err.message || "Request failed";

    if (data?.errors) {
      if (typeof data.errors === "string") {
        message = data.errors;
      } else if (typeof data.errors === "object") {
        const firstError = Object.values(data.errors)[0];
        if (typeof firstError === "string") {
          message = firstError;
        }
      }
    }

    return message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === "string") {
    return err;
  }

  return "An unknown error occurred";
}
