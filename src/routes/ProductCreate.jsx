import {useNavigate} from 'react-router';
import styled from 'styled-components';
import useProducts from '../hooks/useProducts.js';
import ProductForm from '../components/product/ProductForm.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import {getIsoStringDate} from "../utils/Utils.js";

const Container = styled.div`
    margin: 0 auto;
`;

export const ProductCreate = () => {
    const navigate = useNavigate();
    const {data, createProduct, isCreating} = useProducts();
    const breadcrumbItems = [
        {label: 'Home', href: '/dashboard'},
        {label: 'Products', href: '/products'},
        {label: 'Create New Product'}
    ];

    const handleSubmit = async (submittedData) => {
        createProduct({...submittedData, createdAt: getIsoStringDate()});
        navigate(`/products/${data.at(-1).id}`, {state: {product: data.at(-1)}});
    };

    const handleCancel = () => {
        navigate('/products');
    };

    return (
        <Container>
            <div>
                <Breadcrumbs items={breadcrumbItems}/>
                <h2>Create New Product</h2>
            </div>
            <ProductForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={isCreating}
            />
        </Container>
    );
};
