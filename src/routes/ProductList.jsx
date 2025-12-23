import {useState, useMemo} from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce.js';
import useProducts from '../hooks/useProducts.js';
import usePagination from '../hooks/usePagination.js';
import SearchInput from '../components/SearchInput.jsx';
import ProductTable from '../components/ProductTable.jsx';
import Pagination from '../components/Pagination.jsx';
import Modal from '../components/Modal.jsx';
import {FILTER_ACTIVE, FILTER_ALL, FILTER_INACTIVE} from "../constants/Enum.js";

const GapDiv = styled.div`
    display: flex;
    margin-bottom: 1em;
    gap: 1em;
`;

export default function ProductList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(FILTER_ALL);
    const [deleteModal, setDeleteModal] = useState({isOpen: false, product: null});
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const {
        data: products,
        isLoading,
        error,
        deleteProduct,
        isDeleting
    } = useProducts();

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products.filter(product => {
            const matchesSearch = debouncedSearchTerm === '' || product.name.includes(debouncedSearchTerm);
            const matchesStatus = statusFilter === FILTER_ALL ||
                (statusFilter === FILTER_ACTIVE && product.status === FILTER_ACTIVE) ||
                (statusFilter === FILTER_INACTIVE && product.status === FILTER_INACTIVE);
            return matchesSearch && matchesStatus;
        });
    }, [products, debouncedSearchTerm, statusFilter]);

    const {
        currentFirstIndex,
        currentLastIndex,
        currentItems,
        totalItems,
        hasNextPage,
        hasPreviousPage,
        goToNextPage,
        goToPreviousPage
    } = usePagination(filteredProducts, 10);

    const handleNewProduct = () => {
        navigate('/products/new');
    };

    const handleViewProduct = (productId) => {
        navigate(`/products/${productId}`);
    };

    const handleEditProduct = (productId) => {
        navigate(`/products/${productId}/edit`);
    };

    const handleDeleteProduct = (product) => {
        setDeleteModal({isOpen: true, product});
    };

    const confirmDelete = async () => {
        if (deleteModal.product) {
            await deleteProduct(deleteModal.product.id);
            setDeleteModal({isOpen: false, product: null});
        }
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter(FILTER_ALL);
    };

    if (error) {
        return (
            <div>
                <div>Error loading products: {error.message}</div>
            </div>
        );
    }

    const renderProductList = () => {
        if (isLoading) {
            return <div>Loading products...</div>;
        }

        if (filteredProducts.length === 0) {
            return (
                <div>
                    <p>No products, adding the product?</p>
                    <button onClick={() => handleNewProduct()}>Add First Product</button>
                </div>
            );
        }

        return <>
            <ProductTable
                products={currentItems}
                onView={handleViewProduct}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}/>
            <Pagination
                totalItems={totalItems}
                currentFirstIndex={currentFirstIndex}
                currentLastIndex={currentLastIndex}
                goToNextPage={goToNextPage}
                hasPreviousPage={hasPreviousPage}
                hasNextPage={hasNextPage}
                goToPreviousPage={goToPreviousPage}/>
        </>;
    }

    return (
        <div>
            <div><h2>Products</h2></div>
            <GapDiv>
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search products by name..."
                    isSearching={searchTerm !== debouncedSearchTerm}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Products</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button onClick={handleClearFilters}>Clear Filters</button>
                <button onClick={handleNewProduct}>New Product</button>
            </GapDiv>
            {renderProductList()}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({isOpen: false, product: null})}
            >
                <div>
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to delete "{deleteModal.product?.name}"?</p>
                    <GapDiv>
                        <button onClick={() => setDeleteModal({isOpen: false, product: null})}>Cancel</button>
                        <button onClick={confirmDelete}
                                disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
                    </GapDiv>
                </div>
            </Modal>
        </div>
    );
}
