import styled from 'styled-components';
import {formatCurrency} from '../utils/Utils.js';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    font-weight: 600;
`;

const TableCell = styled.td`
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
`;

const ProductImage = styled.img`
    width: 4em;
    height: 4em;
`;

export default function OrderItems({items}) {
    if (!items || items.length === 0) {
        return <div>No items in this order.</div>;
    }

    return (<div>
            <h3>Order Items</h3>
            <Table>
                <thead>
                <tr>
                    <TableHeader>Product</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Quantity</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>Subtotal</TableHeader>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => {
                    const subtotal = item.quantity * item.price;
                    return (<tr key={item.productId}>
                            <TableCell>
                                {item.productImage ? (<ProductImage
                                        src={item.productImage}
                                        alt={item.productName}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />) : null}
                            </TableCell>
                            <TableCell>
                                <div>{item.productName}</div>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                                <div>{formatCurrency(item.price)}</div>
                            </TableCell>
                            <TableCell>
                                <div>{formatCurrency(subtotal)}</div>
                            </TableCell>
                        </tr>);
                })}
                </tbody>
            </Table>
        </div>);
}
