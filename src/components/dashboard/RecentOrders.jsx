import React from 'react';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';
import {Link} from 'react-router';
import {formatCurrency, formatDate} from "../../utils/Utils.js";
import {StatusBadge} from "../common/StatusBadge.jsx";
import {getRecentOrders} from "../../hooks/useDashboard.js";

const TableContainer = styled.div`
    margin-top: 2rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
`;

const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const Table = styled.table`
    width: 100%;
    th, td {
        text-align: left;
    }
`;

const CenterNotice = styled.div`
    padding: 2rem;
    text-align: center;
`;

const RecentOrders = () => {
    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['recentOrders'],
        queryFn: getRecentOrders,
    });

    return (
        <TableContainer>
            <TableHeader>
                <h2>Đơn hàng gần nhất</h2>
                <Link viewTransition to="/orders">View All Orders →</Link>
            </TableHeader>

            {isLoading && <div>Đang tải</div>}

            {error && (
                <div>
                    Lỗi khi tải danh sách đơn hàng: {error.message}
                </div>
            )}

            {orders && orders.length === 0 && (
                <CenterNotice>
                    <div>📦</div>
                    <div>Chưa có đơn hàng nào</div>
                </CenterNotice>
            )}

            {orders && orders.length > 0 && (
                <Table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th className="mobile-hide">Total Amount</th>
                            <th>Status</th>
                            <th className="mobile-hide">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>
                                    <Link viewTransition to={`/orders/${order.id}`}>#{order.id}</Link>
                                </td>
                                <td>{order.customerName}</td>
                                <td>{formatCurrency(order.total)}</td>
                                <td>
                                    <StatusBadge status={order.status}>
                                        {order.status}
                                    </StatusBadge>
                                </td>
                                <td>{formatDate(order.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </TableContainer>
    );
};

export default RecentOrders;



