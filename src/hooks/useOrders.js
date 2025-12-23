import { useQuery } from '@tanstack/react-query';
import { sleep } from "../utils/Utils.js";

const API_BASE_URL = 'http://localhost:3001';

const fetchOrders = async () => {
    await sleep(500);
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json();
};

export default function useOrders() {
    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });

    return {
        data,
        isLoading,
        error,
        refetch,
    };
}