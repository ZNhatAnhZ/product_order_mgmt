import styled from 'styled-components';
import {StatusBadge} from './StatusBadge.jsx';

const TableContainer = styled.div`
    background: white;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    overflow: hidden;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background-color: #f8f9fa;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f8f9fa;
    }
    
    &:hover {
        background-color: #e9ecef;
    }
`;

const TableHeaderCell = styled.th`
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #495057;
    border-bottom: 2px solid #dee2e6;
    font-size: 14px;
`;

const TableCell = styled.td`
    padding: 12px 16px;
    border-bottom: 1px solid #e9ecef;
    vertical-align: middle;
`;

const ProductImage = styled.img`
    width: 3em;
    height: 3em;
`;

const ProductImagePlaceholder = styled.div`
    width: 50px;
    height: 50px;
    background-color: #e9ecef;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    font-size: 12px;
`;

const ProductName = styled.button`
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-weight: 500;
    text-align: left;
    padding: 0;
    
    &:hover {
        text-decoration: underline;
    }
`;

const Description = styled.p`
    margin: 0;
    color: #6c757d;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Price = styled.span`
    font-weight: 600;
    color: #28a745;
`;

const Stock = styled.span`
    font-weight: 500;
    
    &.low {
        color: #dc3545;
    }
    
    &.medium {
        color: #fd7e14;
    }
    
    &.high {
        color: #28a745;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
`;

const ActionButton = styled.button`
    padding: 6px 12px;
    border: 1px solid;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    &.view {
        background: white;
        border-color: #007bff;
        color: #007bff;
        
        &:hover {
            background: #007bff;
            color: white;
        }
    }
    
    &.edit {
        background: white;
        border-color: #ffc107;
        color: #ffc107;
        
        &:hover {
            background: #ffc107;
            color: #212529;
        }
    }
    
    &.delete {
        background: white;
        border-color: #dc3545;
        color: #dc3545;
        
        &:hover {
            background: #dc3545;
            color: white;
        }
    }
`;

const getStockStatus = (stock) => {
    if (stock < 10) return 'low';
    if (stock <= 50) return 'medium';
    return 'high';
};

const getProductStatus = (stock) => {
    return stock > 0 ? 'active' : 'inactive';
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

export default function ProductTable({
    products,
    onView,
    onEdit,
    onDelete
}) {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Image</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Description</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Stock</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                {product.image ? (
                                    <ProductImage
                                        src={product.image}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : (
                                    <ProductImagePlaceholder>
                                        No Image
                                    </ProductImagePlaceholder>
                                )}
                            </TableCell>
                            <TableCell>
                                <ProductName onClick={() => onView(product.id)}>
                                    {product.name}
                                </ProductName>
                            </TableCell>
                            <TableCell>
                                <Description title={product.description}>
                                    {product.description || 'No description'}
                                </Description>
                            </TableCell>
                            <TableCell>
                                <Price>{formatPrice(product.price)}</Price>
                            </TableCell>
                            <TableCell>
                                <Stock className={getStockStatus(product.stock)}>
                                    {product.stock}
                                </Stock>
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={getProductStatus(product.stock)} />
                            </TableCell>
                            <TableCell>
                                <ActionButtons>
                                    <ActionButton
                                        className="view"
                                        onClick={() => onView(product.id)}
                                    >
                                        View
                                    </ActionButton>
                                    <ActionButton
                                        className="edit"
                                        onClick={() => onEdit(product.id)}
                                    >
                                        Edit
                                    </ActionButton>
                                    <ActionButton
                                        className="delete"
                                        onClick={() => onDelete(product)}
                                    >
                                        Delete
                                    </ActionButton>
                                </ActionButtons>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
}
