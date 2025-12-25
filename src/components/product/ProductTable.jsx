import styled from 'styled-components';
import {StatusBadge} from '../common/StatusBadge.jsx';
import {Link} from "react-router";
import {formatCurrency, getStockStatus} from "../../utils/Utils.js";
import {Stock} from "./Stock.jsx";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background-color: #f8f9fa;
`;

const TableHeaderCell = styled.th`
    text-align: left;
`;

const ProductImage = styled.img`
    width: 3em;
    height: 3em;
`;

const Description = styled.p`
    color: #6c757d;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.5em;
`;

export default function ProductTable({products, onView, onEdit, onDelete}) {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <Table>
            <TableHeader>
                <tr>
                    <TableHeaderCell>Image</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Price</TableHeaderCell>
                    <TableHeaderCell>Stock</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                </tr>
            </TableHeader>
            <tbody>
            {
                products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <ProductImage
                                src={product.image}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        </td>
                        <td><Link viewTransition to={`/products/${product.id}`} state={{product}}>{product.name}</Link></td>
                        <td><Description>{product.description || 'No description'}</Description></td>
                        <td>{formatCurrency(product.price)}</td>
                        <td><Stock className={getStockStatus(product.stock)}>{product.stock}</Stock></td>
                        <td><StatusBadge status={product.status}>{product.status}</StatusBadge></td>
                        <td>
                            <ActionButtons>
                                <button onClick={() => onView(product.id, product)}>View</button>
                                <button onClick={() => onEdit(product.id, product)}>Edit</button>
                                <button onClick={() => onDelete(product)}>Delete</button>
                            </ActionButtons>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    );
}
