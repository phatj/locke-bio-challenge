import { AxiosError } from 'axios';

export const isAxiosError = <T = unknown>(
  error: AxiosError | unknown
): error is Required<AxiosError<T>> => {
  return (error as AxiosError).isAxiosError;
};
