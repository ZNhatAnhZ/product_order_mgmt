import {useState, useMemo, useEffect} from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce.js';
import useProducts from '../hooks/useProducts.js';
import usePagination from '../hooks/usePagination.js';
import SearchInput from '../components/common/SearchInput.jsx';
import ProductTable from '../components/product/ProductTable.jsx';
import Pagination from '../components/common/Pagination.jsx';
import {Modal, ModalActions} from '../components/common/Modal.jsx';
import {PRODUCT_STATUS} from "../constants/Enum.js";
import {SkeletonWrapper} from "../components/common/SkeletonWrapper";
import {Button} from "@mui/material";

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
            await deleteProduct(deleteModal.product.id);
            setDeleteModal({isOpen: false, product: null});
        }
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter(PRODUCT_STATUS.ALL);
    };

    if (error) {
        return <div>Error loading products: {error.message}</div>;
    }

    const renderProductList = () => {
        if (!isLoading && filteredProducts.length === 0) {
            return (
                <div>
                    <p>No products, adding the product?</p>
                    <Button onClick={() => handleNewProduct()}>Add First Product</Button>
                </div>
            );
        }

        return <SkeletonWrapper isLoading={isLoading}>
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
        </SkeletonWrapper>;
    }

    return (
        <div>
            <div>
                <h1>Products</h1>
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
                <Button onClick={handleClearFilters} size='small'>Clear Filters</Button>
                <Button onClick={handleNewProduct} size='small'>New Product</Button>
            </GapDiv>
            {renderProductList()}
            <Modal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({isOpen: false, product: null})}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete "{deleteModal.product?.name}"?</p>
                <ModalActions>
                    <Button onClick={() => setDeleteModal({isOpen: false, product: null})}>Cancel</Button>
                    <Button onClick={confirmDelete} disabled={isDeleting} loading={isDeleting}>Delete</Button>
                </ModalActions>
            </Modal>
        </div>
    );
}
