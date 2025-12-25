import styled from 'styled-components';
import {Link} from 'react-router';
import { StatusBadge } from '../common/StatusBadge.jsx';
import {formatCurrency, formatDate} from "../../utils/Utils.js";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background-color: #f8f9fa;
`;

const TableCell = styled.td`
    padding: 1em;
    text-align: center;
`;

export default function OrderTable({ orders = [], onView }) {
    if (!orders || orders.length === 0) {
        return null;
    }

    return (
        <Table>
            <TableHeader>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </TableHeader>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <TableCell>
                            <Link viewTransition to={`/orders/${order.id}`} state={{order}}>{order.id}</Link>
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>{formatCurrency(order.total)}</TableCell>
                        <TableCell>
                            <StatusBadge variant={order.status}>
                                {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
                            </StatusBadge>
                        </TableCell>
                        <TableCell><button onClick={() => onView && onView(order.id, order)}>View</button></TableCell>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
