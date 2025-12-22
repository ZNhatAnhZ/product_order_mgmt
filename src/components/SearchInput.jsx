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

    const handleClear = () => {
        onChange('');
        inputRef.current?.focus();
    };

    const showClear = value && !isSearching;

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

            {isSearching ? (
                <div>
                    Searching...
                </div>
            ) : showClear ? (
                <button
                    type="button"
                    onClick={handleClear}
                    title="Clear search"
                >×</button>
            ) : null}
        </div>
    );
}
