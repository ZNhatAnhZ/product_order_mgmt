import {useNavigate} from 'react-router';
import styled from 'styled-components';
import useProducts from '../hooks/useProducts.js';
import ProductForm from '../components/ProductForm.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
`;

const Header = styled.div`
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin: 1rem 0;
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
        await createProduct({
            ...submittedData,
            createdAt: new Date().toISOString()
        });
        navigate(`/products/${data.at(-1).id}`, {state: {product: data.at(-1)}});
    };

    const handleCancel = () => {
        navigate('/products');
    };

    return (
        <Container>
            <Header>
                <Breadcrumbs items={breadcrumbItems}/>
                <Title>Create New Product</Title>
            </Header>
            <ProductForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={isCreating}
            />
        </Container>
    );
};
