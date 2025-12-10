import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
    const readValue = () => {
        try {
            const item = localStorage.getItem(key);
            if (!item) {
                return typeof initialValue === "function"
                    ? initialValue()
                    : initialValue;
            }
            return JSON.parse(item);
        } catch (error) {
            console.error(`useLocalStorage: failed to read key "${key}"`, error);
            localStorage.removeItem(key);
            return typeof initialValue === "function"
                ? initialValue()
                : initialValue;
        }
    };

    const [value, setValue] = useState(readValue);

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`useLocalStorage: failed to write key "${key}"`, error);
        }
    }, [key, value]);

    useEffect(() => {
        const handleStorage = () => {
            setValue(readValue());
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return [value, setValue];
}
