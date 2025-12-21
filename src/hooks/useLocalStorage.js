import {useEffect, useState} from "react";

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = globalThis.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            globalThis.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.log(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}