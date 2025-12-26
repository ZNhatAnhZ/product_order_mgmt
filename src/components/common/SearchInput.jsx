import { useRef } from 'react';

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    isSearching = false,
    disabled = false,
    ...props
}) {
    const inputRef = useRef(null);

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                {...props}
            />
            {isSearching ? (<span> Searching...</span>) : null}
        </div>
    );
}
