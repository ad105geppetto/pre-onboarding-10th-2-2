import { useEffect } from "react";

type CallbackFunction = (...args: any[]) => any;

const useDebounce = (value: any, callback: CallbackFunction, delay: number): void => {
  useEffect(() => {
    const timer = setTimeout(() => callback(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, callback, delay]);
};

export default useDebounce;
