import React from 'react';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';
import Card from "./Card.jsx";
import {Link} from "react-router";
import {getProducts} from "../../hooks/useDashboard.js";

const AlertContainer = styled.div`
    margin-top: 2rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
`;

const AlertHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
`;

export const LowStockAlert = () => {
    const {data: products, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const lowStockProducts = products?.filter(product => product.stock < 10) || [];

    if (isLoading) {
        return (
            <AlertContainer>
                <AlertHeader>
                    <h2>Cảnh báo tồn kho thấp</h2>
                    <div>đang tải</div>
                </AlertHeader>
            </AlertContainer>
        );
    }

    if (error) {
        return (
            <AlertContainer>
                <AlertHeader>
                    <h2>Cảnh báo tồn kho thấp</h2>
                </AlertHeader>
                <div>Lỗi khi tải danh sách sản phẩm: {error.message}</div>
            </AlertContainer>
        );
    }

    return (
        <AlertContainer>
            <AlertHeader><h2>Cảnh báo tồn kho thấp</h2></AlertHeader>

            {lowStockProducts.length === 0 ? (
                <div>
                    <div>Tất cả sản phẩm đều có tồn kho đủ</div>
                    <div>Không có sản phẩm nào cần bổ sung kho</div>
                </div>
            ) : (
                <div>
                    {lowStockProducts.map(product => (
                        <Card key={product.id}>
                            <Link viewTransition to={`/products/${product.id}`} state={{product}}>#{product.id}</Link>
                            <div>tên sản phẩm: {product.name}</div>
                            <div>category: {product.category}</div>
                            {product.stock < 5 ? <div style={{color: 'red'}}>stock: {product.stock}</div> : <div>stock: {product.stock}</div>}
                        </Card>
                    ))}
                </div>
            )}
        </AlertContainer>
    );
};
