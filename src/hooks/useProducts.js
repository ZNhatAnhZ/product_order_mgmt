import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {sleep} from "../utils/Utils.js";

const API_BASE_URL = 'http://localhost:3001';

const fetchProducts = async () => {
    await sleep(500);
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

const createProduct = async (productData) => {
    await sleep(300);
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return response.json();
};

const updateProduct = async ({ id, ...productData }) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return response.json();
};

const deleteProductApi = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
    return true;
};

export default function useProducts() {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const createMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['products']);
            toast.success('Product created successfully!');
            return data;
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create product');
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            toast.success('Product updated successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to update product');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProductApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            toast.success('Product deleted successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to delete product');
        }
    });

    return {
        data,
        isLoading,
        error,
        createProduct: createMutation.mutate,
        updateProduct: updateMutation.mutate,
        deleteProduct: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
