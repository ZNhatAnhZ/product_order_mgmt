import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { sleep } from "../utils/Utils.js";
import {toast} from "react-toastify";

const API_BASE_URL = 'http://localhost:3001';

const fetchOrders = async () => {
    await sleep(500);
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json();
};

const updateOrder = async ({ id, ...orderData }) => {
    await sleep(500);
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to update order');
    }
    return response.json();
};

export default function useOrders() {
    const queryClient = useQueryClient();
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });

    const updateMutation = useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
            toast.success('Order updated successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to update order');
        }
    });

    return {
        data,
        isLoading,
        error,
        updateOrder: updateMutation.mutate,
        isUpdating: updateMutation.isPending
    };
}