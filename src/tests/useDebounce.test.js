import {act, renderHook} from '@testing-library/react';
import useDebounce from "../hooks/useDebounce";

describe('useDebounce Hook', () => {
    it('should return initial value and debounce updates', async () => {
        jest.useFakeTimers();
        const initialValue = 'test';
        const newValue = 'debounced';
        const delay = 500;
        const {result, rerender} = renderHook(
            ({value}) => useDebounce(value, delay),
            {initialProps: {value: initialValue}}
        );
        expect(result.current).toBe(initialValue);

        act(() => {
            rerender({value: newValue});
        });
        expect(result.current).toBe(initialValue);
        act(() => {
            jest.advanceTimersByTime(delay);
        });
        expect(result.current).toBe(newValue);

        jest.useRealTimers();
    });
});
