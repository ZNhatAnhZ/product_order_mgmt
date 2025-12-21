import {useEffect, useState} from "react";

export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
                console.log('debouncedValue', value);
                setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay, debouncedValue]);
    return debouncedValue;
}