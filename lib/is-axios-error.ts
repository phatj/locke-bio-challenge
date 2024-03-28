import { AxiosError } from 'axios';

/**
 * Typeguard that checks if an error is an Axios error or not.
 */
export const isAxiosError = <T = unknown>(
  error: AxiosError | unknown
): error is Required<AxiosError<T>> => {
  return (error as AxiosError).isAxiosError;
};
