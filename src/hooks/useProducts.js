import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3001';

// API functions
const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

const fetchProduct = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return response.json();
};

const createProduct = async (productData) => {
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

    // Get all products
    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    // Create product mutation
    const createMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            toast.success('Product created successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create product');
        }
    });

    // Update product mutation
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

    // Delete product mutation
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
        refetch,
        createProduct: createMutation.mutate,
        updateProduct: updateMutation.mutate,
        deleteProduct: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
