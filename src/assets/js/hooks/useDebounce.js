import { useEffect, useRef, useState } from "react";

export default function useDebounce(value) {
    const [debouncedValue, setDebouncedValue] = useState('');
    const timeoutRef = useRef(null);

    useEffect(() => {

        if (!debouncedValue) {
            setDebouncedValue(value);

        } else {
            const timeoutId = setTimeout(() => {
                setDebouncedValue(value);
            }, 700)

            timeoutRef.current = timeoutId;

        }


        return () => {
            clearTimeout(timeoutRef?.current);
        }

    }, [value]);


    return debouncedValue;

}
