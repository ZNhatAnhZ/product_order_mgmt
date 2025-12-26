import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {sleep} from "../utils/Utils.js";
import {API_BASE_URL} from "../constants/Enum.js";

const fetchProducts = async () => {
    const url = `${API_BASE_URL}/products`;
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

const createProduct = async (productData) => {
    await sleep(500);
    const url = `${API_BASE_URL}/products`;
    let response = null;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
    } catch (error) {
        throw new Error(`Network error while fetching data from ${url}: ${error.message}`);
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url} with http error code: ${response.status}`);

    }
    return response.json();
};

const updateProduct = async ({ id, ...productData }) => {
    await sleep(500);
    const url = `${API_BASE_URL}/products/${id}`;
    let response = null;
    try {
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
    } catch (error) {
        throw new Error(`Network error while fetching data from ${url}: ${error.message}`);
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url} with http error code: ${response.status}`);
    }
    return response.json();
};

const deleteProduct = async (id) => {
    await sleep(1000);
    const url = `${API_BASE_URL}/products/${id}`;
    let response = null;
    try {
        response = await fetch(url, {method: 'DELETE'});
    } catch (error) {
        throw new Error(`Network error while fetching data from ${url}: ${error.message}`);
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url} with http error code: ${response.status}`);
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
        mutationFn: deleteProduct,
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
        createProduct: createMutation.mutateAsync,
        updateProduct: updateMutation.mutateAsync,
        deleteProduct: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
