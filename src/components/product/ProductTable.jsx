import styled from 'styled-components';
import {StatusBadge} from '../common/StatusBadge.jsx';
import {Link} from "react-router";
import {formatCurrency, getStockStatus} from "../../utils/Utils.js";
import {Stock} from "./Stock.jsx";
import {Button} from "@mui/material";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        text-align: center;
    }
`;

const TableHeader = styled.thead`
    background-color: #f8f9fa;
`;

const ProductImage = styled.img`
    width: 3em;
    height: 3em;
`;

const Description = styled.p`
    color: #6c757d;
    max-width: 20em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.5em;
    justify-content: center;
`;

export default function ProductTable({products, onView, onEdit, onDelete}) {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <Table>
            <TableHeader>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                        <td><Description>{product.description}</Description></td>
                        <td>{formatCurrency(product.price)}</td>
                        <td><Stock className={getStockStatus(product.stock)}>{product.stock}</Stock></td>
                        <td><StatusBadge $status={product.status}>{product.status}</StatusBadge></td>
                        <td>
                            <ActionButtons>
                                <Button onClick={() => onView(product.id, product)}>View</Button>
                                <Button onClick={() => onEdit(product.id, product)}>Edit</Button>
                                <Button onClick={() => onDelete(product)}>Delete</Button>
                            </ActionButtons>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    );
}
