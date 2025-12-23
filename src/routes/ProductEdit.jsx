import {useNavigate, useLocation} from 'react-router';
import styled from 'styled-components';
import useProducts from '../hooks/useProducts.js';
import ProductForm from '../components/ProductForm.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import {getIsoStringDate} from "../utils/Utils.js";

const Container = styled.div`
    margin: 0 auto;
`;

export const ProductEdit = () => {
    const { state } = useLocation();
    const product = state?.product;
    const navigate = useNavigate();
    const { updateProduct, isUpdating } = useProducts();

    const getBreadcrumbItems = () => [
        { label: 'Home', href: '/dashboard' },
        { label: 'Products', href: '/products' },
        { label: product ? product.name : 'Loading...', href: product ? `/products/${product.id}` : '#', product: product},
        { label: 'Edit' }
    ];

    const handleSubmit = async (submittedData) => {
        if (product) {
            const submittingData = {
                id: product.id,
                ...submittedData,
                createdAt: getIsoStringDate()
            };
            updateProduct(submittingData);
            navigate(`/products/${product.id}`, { state: { product: { ...submittingData } } });
        }
    };

    const handleCancel = () => {
        navigate('/products');
    };

    const handleBack = () => {
        navigate('/products');
    };

    if (!product) {
        return (
            <div>
                <Breadcrumbs items={getBreadcrumbItems()}/>
                <Container>
                    <h1>Product Not Found</h1>
                    <h2>The product you're looking for doesn't exist or may have been removed.</h2>
                    <button onClick={handleBack}>Back to Products</button>
                </Container>
            </div>
        );
    }

    const initialData = {
        name: product.name || '',
        description: product.description || '',
        price: product.price ? product.price.toString() : '',
        stock: product.stock ? product.stock.toString() : '',
        image: product.image || '',
        status: product.status || 'active',
    };

    return (
        <Container>
            <div>
                <Breadcrumbs items={getBreadcrumbItems()} />
                <h2>Edit Product</h2>
            </div>
            <ProductForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={isUpdating}
                initialData={initialData}
                isEditMode={true}
            />
        </Container>
    );
};
