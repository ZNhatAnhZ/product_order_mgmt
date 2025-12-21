import React from 'react';
import StatsCard from "../components/StatsCard.jsx";
import RecentOrders from "../components/RecentOrders.jsx";
import LowStockAlert from "../components/LowStockAlert.jsx";
import {useQuery} from "@tanstack/react-query";
import {getDashboardStats} from "../services/dashboardAPI.js";
import styled from 'styled-components';
import {formatCurrency} from "../utils/Utils.js";

const DashboardContainer = styled.div`
    padding: 1rem;
`;

const DashboardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;


const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
`;

const CenterNotice = styled.div`
    padding: 2rem;
    text-align: center;
`;

const ErrorText = styled.p`
    color: red;
`;

const LastUpdated = styled.div`
    margin-top: 2rem;
    text-align: center;
    font-size: 0.9rem;
    color: #666;
`;

export default function Dashboard() {
    const {
        data: dashboardData,
        isLoading: loading,
        error,
        refetch: loadDashboard,
        isRefetching
    } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardStats
    });

    const formatChange = (change, changeType) => {
        if (!change) return '';
        const sign = changeType === 'positive' ? '+' : '';
        return `${sign}${change}% so với tháng trước`;
    };

    if (loading) {
        return (
            <CenterNotice>
                <p>Đang tải dữ liệu dashboard...</p>
            </CenterNotice>
        );
    }

    if (error) {
        return (
            <CenterNotice>
                <ErrorText>Lỗi: {error.message}</ErrorText>
            </CenterNotice>
        );
    }

    if (!dashboardData) {
        return (
            <CenterNotice>
                <p>Không có dữ liệu</p>
            </CenterNotice>
        );
    }

    return (
        <DashboardContainer>
            <DashboardHeader>
                <button onClick={() => loadDashboard()} disabled={isRefetching}>
                    {isRefetching ? 'Đang tải...' : 'Làm mới'}
                </button>
            </DashboardHeader>
            <StatsGrid>
                <StatsCard
                    icon={'📦'}
                    title={'Total Products'}
                    description={`Số lượng sản phẩm: ${dashboardData.totalProducts.value}`}
                    change={formatChange(dashboardData.totalProducts.change, dashboardData.totalProducts.changeType)}
                />

                <StatsCard
                    icon={'📊'}
                    title={'Total Orders'}
                    description={`Số lượng đơn hàng: ${dashboardData.totalOrders.value}`}
                    change={formatChange(dashboardData.totalOrders.change, dashboardData.totalOrders.changeType)}
                />

                <StatsCard
                    isWarning={true}
                    icon={'⏳'}
                    title={'Pending Orders'}
                    description={`Số đơn hàng chờ xử lý: ${dashboardData.pendingOrders.value}`}
                />

                <StatsCard
                    icon={'💰'}
                    title={'Revenue'}
                    description={`Tổng doanh thu: ${formatCurrency(dashboardData.revenue.value)}`}
                />
            </StatsGrid>
            <RecentOrders />
            <LowStockAlert />
            {dashboardData.lastUpdated && (
                <LastUpdated>
                    Cập nhật lần cuối: {dashboardData.lastUpdated}
                </LastUpdated>
            )}
        </DashboardContainer>
    );
};
