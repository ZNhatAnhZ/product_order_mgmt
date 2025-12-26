import {act, renderHook, waitFor} from '@testing-library/react';
import useProducts from "../hooks/useProducts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {toast} from "react-toastify";

describe('useProduct Hook', () => {
    let queryClient;

    const createWrapper = () => {
        return ({children}) => {
            return (<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
        };
    };

    beforeEach(() => {
        queryClient = new QueryClient();
        queryClient.invalidateQueries = jest.fn();
        jest.clearAllMocks();
    });

    it('should return data in the successful case', async () => {
        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue({id: 1, name: 'Test Product'}),
        });
        const {result} = renderHook(() => useProducts(), {wrapper: createWrapper()});
        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(result.current.isLoading).toBe(false);
            expect(result.current.data).toEqual({id: 1, name: 'Test Product'});
        });
    });

    it('should return 500 error', async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 500,
        });
        const {result} = renderHook(() => useProducts(), {wrapper: createWrapper()});
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(result.current.data).toBeUndefined();
            expect(result.current.error).toBeDefined();
        });
    });

    it('should return network error', async () => {
        fetch.mockRejectedValue(new Error('Network Error'));
        const {result} = renderHook(() => useProducts(), {wrapper: createWrapper()});
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(result.current.error).toBeDefined();
        });
    });

    it('should create product in the successful case', async () => {
        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue({name: 'Test Product'}),
        });
        const {result} = renderHook(() => useProducts(), {wrapper: createWrapper()});
        expect(typeof result.current.createProduct).toBe('function');
        await act(() => result.current.createProduct({name: 'Test Product'}));
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => {
            // called twice: once for fetching products, once for creating product
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(result.current.isLoading).toBe(false);
            expect(queryClient.invalidateQueries).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalled();
        });
    });

    it('should update product in the successful case', async () => {
        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue({id: 1, name: 'Updated Product'}),
        });
        const {result} = renderHook(() => useProducts(), {wrapper: createWrapper()});
        expect(typeof result.current.updateProduct).toBe('function');
        await act(() => result.current.updateProduct({id: 1, name: 'Updated Product'}));
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => {
            // called twice: once for fetching products, once for updating product
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(result.current.isLoading).toBe(false);
            expect(queryClient.invalidateQueries).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalled();
        });
    });

    it('should delete product in the successful case', async () => {
        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue([])
        });
        const {result} = renderHook(() => useProducts(), {wrapper: createWrapper()});
        expect(typeof result.current.deleteProduct).toBe('function');
        await act(() => result.current.deleteProduct(1));
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => {
            // called twice: once for fetching products, once for deleting product
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(result.current.isLoading).toBe(false);
            expect(queryClient.invalidateQueries).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalled();
        });
    });
});
