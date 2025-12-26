import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router';
import styled from 'styled-components';
import useProducts from '../hooks/useProducts.js';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import {StatusBadge} from '../components/common/StatusBadge.jsx';
import {Modal, ModalActions} from '../components/common/Modal.jsx';
import {formatCurrency, formatDate, getStockStatus} from "../utils/Utils.js";
import {Stock} from "../components/product/Stock.jsx";
import {Button} from "@mui/material";

const ProductContent = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-evenly;
`;

const ProductImage = styled.img`
    max-width: 50em;
    max-height: 40em;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5em 0;
    border-bottom: 1px solid #eee;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1em;
`;

const NotFoundContainer = styled.div`
    text-align: center;
    padding: 3rem 2rem;
`;

export default function ProductDetail() {
    const { state } = useLocation();
    const product = state?.product;
    const navigate = useNavigate();
    const {deleteProduct, isDeleting} = useProducts();
    const [deleteModal, setDeleteModal] = useState({isOpen: false});

    const handleEdit = () => {
        navigate(`/products/${product.id}/edit`, { state: { product }, viewTransition: true });
    };

    const handleDelete = () => {
        setDeleteModal({isOpen: true});
    };

    const confirmDelete = async () => {
        if (product) {
            await deleteProduct(product.id);
            setDeleteModal({isOpen: false});
            navigate('/products', { viewTransition: true });
        }
    };

    const handleBack = () => {
        navigate('/products', { viewTransition: true });
    };

    const getBreadcrumbItems = () => [
        {label: 'Home', href: '/dashboard'},
        {label: 'Products', href: '/products'},
        {label: product ? product.name : 'Product Not Found'}
    ];

    if (!product) {
        return (
            <div>
                <Breadcrumbs items={getBreadcrumbItems()}/>
                <NotFoundContainer>
                    <h2>Product Not Found</h2>
                    <h2>The product you're looking for doesn't exist or may have been removed.</h2>
                    <Button onClick={handleBack}>Back to Products</Button>
                </NotFoundContainer>
            </div>
        );
    }

    return (
        <div>
            <Breadcrumbs items={getBreadcrumbItems()}/>
            <ProductContent>
                <div>
                    {product.image ? (
                        <ProductImage
                            src={product.image}
                            alt={product.name}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : (<div>No Image Available</div>)}
                </div>

                <div>
                    <h1>{product.name}</h1>
                    <h2>{formatCurrency(product.price)}</h2>
                    <p>{product.description}</p>
                    <div>
                        <InfoRow>
                            <div>Stock Quantity:</div>
                            <Stock className={getStockStatus(product.stock)}>{product.stock} units</Stock>
                        </InfoRow>
                        <InfoRow>
                            <div>Status:</div>
                            <StatusBadge $status={product.status}>{product.status}</StatusBadge>
                        </InfoRow>
                        <InfoRow>
                            <div>Product ID:</div>
                            <div>#{product.id}</div>
                        </InfoRow>
                        <InfoRow>
                            <div>Created Date:</div>
                            <div>{formatDate(product.createdAt)}</div>
                        </InfoRow>
                    </div>
                    <ActionButtons>
                        <Button onClick={handleEdit}>Edit Product</Button>
                        <Button onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete Product'}
                        </Button>
                        <Button onClick={handleBack}>Back to Products</Button>
                    </ActionButtons>
                </div>
            </ProductContent>

            <Modal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({isOpen: false})}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete "{product.name}"?</p>
                <p>This action cannot be undone.</p>
                <ModalActions>
                    <Button onClick={() => setDeleteModal({isOpen: false})}>Cancel</Button>
                    <Button onClick={confirmDelete} disabled={isDeleting} loading={isDeleting}>Delete</Button>
                </ModalActions>
            </Modal>
        </div>
    );
}
