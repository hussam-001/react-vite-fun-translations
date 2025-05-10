import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: any
): [T, (value: any) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const value = localStorage.getItem(key) as string;
      setStoredValue(value ? JSON.parse(value) : initialValue);
    } catch (error) {
      console.error("🚀 ~ useLocalStorage setStoredValue error:", error);
    }
  }, [key]);

  const setValue = useCallback(
    (value: any) => {
      try {
        setStoredValue(value);
        const stringifiedValue = JSON.stringify(value);
        localStorage.setItem(key, stringifiedValue);
      } catch (error) {
        console.error("🚀 ~ useLocalStorage setValue error:", error);
        console.warn(error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
