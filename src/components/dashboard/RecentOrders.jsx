import React from 'react';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';
import {Link} from 'react-router';
import {formatCurrency, formatDate} from "../../utils/Utils.js";
import {StatusBadge} from "../common/StatusBadge.jsx";
import {getRecentOrders} from "../../hooks/useDashboard.js";
import {SkeletonWrapper} from "../common/SkeletonWrapper";

const TableContainer = styled.div`
    margin-top: 1em;
    border-radius: 1em;
    padding: 1em;
    border: 0.1em solid #e2e8f0;
`;

const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
`;

const Table = styled.table`
    width: 100%;
    th, td {
        text-align: center;
    }
`;

const CenterNotice = styled.div`
    padding: 2rem;
    text-align: center;
`;

export const RecentOrders = () => {
    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['recentOrders'],
        queryFn: getRecentOrders,
    });

    if (error) {
        return <CenterNotice>Lỗi khi tải danh sách đơn hàng: {error.message}</CenterNotice>;
    }

    if (!isLoading && orders && orders.length === 0) {
        return <CenterNotice>Chưa có đơn hàng nào</CenterNotice>;
    }

    return (
        <TableContainer>
            <TableHeader>
                <h2>Đơn hàng gần nhất</h2>
                <Link viewTransition to="/orders">View All Orders →</Link>
            </TableHeader>
            <SkeletonWrapper isLoading={isLoading}>
                <Table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map(order => (
                        <tr key={order.id}>
                            <td><Link viewTransition to={`/orders/${order.id}`}>#{order.id}</Link></td>
                            <td>{order.customerName}</td>
                            <td>{formatCurrency(order.total)}</td>
                            <td><StatusBadge $status={order.status}>{order.status}</StatusBadge></td>
                            <td>{formatDate(order.createdAt)}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </SkeletonWrapper>
        </TableContainer>
    );
};



