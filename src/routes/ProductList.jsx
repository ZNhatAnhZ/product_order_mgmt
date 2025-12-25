import {useState, useMemo} from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce.js';
import useProducts from '../hooks/useProducts.js';
import usePagination from '../hooks/usePagination.js';
import SearchInput from '../components/common/SearchInput.jsx';
import ProductTable from '../components/product/ProductTable.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Modal from '../components/common/Modal.jsx';
import {PRODUCT_STATUS} from "../constants/Enum.js";

const GapDiv = styled.div`
    display: flex;
    margin-bottom: 1em;
    gap: 1em;
`;

export default function ProductList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(PRODUCT_STATUS.ALL);
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
            const matchesStatus = statusFilter === PRODUCT_STATUS.ALL ||
                (statusFilter === PRODUCT_STATUS.ACTIVE && product.status === PRODUCT_STATUS.ACTIVE) ||
                (statusFilter === PRODUCT_STATUS.INACTIVE && product.status === PRODUCT_STATUS.INACTIVE);
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
        navigate('/products/new', { viewTransition: true });
    };

    const handleViewProduct = (productId, product) => {
        navigate(`/products/${productId}`, {state: {product}, viewTransition: true });
    };

    const handleEditProduct = (productId, product) => {
        navigate(`/products/${productId}/edit`, {state: {product}, viewTransition: true });
    };

    const handleDeleteProduct = (product) => {
        setDeleteModal({isOpen: true, product});
    };

    const confirmDelete = async () => {
        if (deleteModal.product) {
            deleteProduct(deleteModal.product.id);
            setDeleteModal({isOpen: false, product: null});
        }
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter(PRODUCT_STATUS.ALL);
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
            <div>
                <h2>Products</h2>
                <div>{totalItems} {totalItems === 1 ? 'product' : 'products'} total</div>
            </div>
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
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete "{deleteModal.product?.name}"?</p>
                <GapDiv>
                    <button onClick={() => setDeleteModal({isOpen: false, product: null})}>Cancel</button>
                    <button onClick={confirmDelete}
                            disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
                </GapDiv>
            </Modal>
        </div>
    );
}
