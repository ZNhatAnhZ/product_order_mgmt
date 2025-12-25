import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { sleep } from "../utils/Utils.js";
import {toast} from "react-toastify";
import {API_BASE_URL} from "../constants/Enum.js";

const fetchOrders = async () => {
    await sleep(500);
    const url = `${API_BASE_URL}/orders`;
    let response = null;
    try {
        response = await fetch(url);
    } catch (error) {
        throw new Error(`Network error while fetching data from ${url}: ${error.message}`);
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url} with http error code: ${response.status}`);
    }
    return response.json();
};

const updateOrder = async ({ id, ...orderData }) => {
    await sleep(500);
    const url = `${API_BASE_URL}/orders/${id}`;
    let response = null;
    try {
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
    } catch (error) {
        throw new Error(`Network error while fetching data from ${url}: ${error.message}`);
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url} with http error code: ${response.status}`);
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