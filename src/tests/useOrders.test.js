import {act, renderHook, waitFor} from '@testing-library/react';
import useOrders from "../hooks/useOrders";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {toast} from "react-toastify";

describe('useOrders Hook', () => {
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
            json: jest.fn().mockResolvedValue({id: 1, status: 'pending', items: []}),
        });
        const {result} = renderHook(() => useOrders(), {wrapper: createWrapper()});
        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(result.current.isLoading).toBe(false);
            expect(result.current.data).toEqual({id: 1, status: 'pending', items: []});
        });
    });

    it('should update order in the successful case', async () => {
        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue({id: 1, status: 'completed'}),
        });
        const {result} = renderHook(() => useOrders(), {wrapper: createWrapper()});
        expect(typeof result.current.updateOrder).toBe('function');
        await act(() => result.current.updateOrder({id: 1, status: 'completed'}));
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => {
            // called twice: once for fetching orders, once for updating order
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(result.current.isLoading).toBe(false);
            expect(queryClient.invalidateQueries).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalled();
        });
    });
});
