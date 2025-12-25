import {renderHook} from '@testing-library/react';
import usePagination from "../hooks/usePagination";

describe('usePagination Hook', () => {
    it('should return initial value and debounce updates', async () => {
        const items = Array.from({length: 50}, (_, i) => i + 1);
        const {result} = renderHook(() => usePagination(items, 10));
        expect(result.current.currentFirstIndex).toBe(1);
        expect(result.current.currentLastIndex).toBe(10);
        expect(result.current.currentItems).toStrictEqual(items.slice(0, 10));
        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(5);
        expect(result.current.totalItems).toBe(50);
        expect(result.current.currentFirstIndex).toBe(1);
        expect(result.current.hasNextPage).toBe(true);
        expect(result.current.hasPreviousPage).toBe(false);
        expect(typeof result.current.goToNextPage).toBe('function');
        expect(typeof result.current.goToPreviousPage).toBe('function');
    });
});
