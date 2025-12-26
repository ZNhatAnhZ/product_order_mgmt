import React from 'react';
import StatsCard from "../components/dashboard/StatsCard.jsx";
import {RecentOrders} from "../components/dashboard/RecentOrders.jsx";
import {LowStockAlert} from "../components/dashboard/LowStockAlert.jsx";
import {useQuery} from "@tanstack/react-query";
import styled from 'styled-components';
import {formatCurrency} from "../utils/Utils.js";
import {getDashboardStats} from "../hooks/useDashboard.js";
import {FaBox} from "react-icons/fa";
import {IoHourglass} from "react-icons/io5";
import {TbPigMoney} from "react-icons/tb";
import {FcStatistics} from "react-icons/fc";
import {ErrorMessage} from "../components/common/ErrorMessage";
import {SkeletonWrapper} from "../components/common/SkeletonWrapper";
import {Button} from "@mui/material";

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
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
`;

const CenterNotice = styled.div`
    padding: 2rem;
    text-align: center;
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

    if (error) {
        return (<CenterNotice><ErrorMessage>Lỗi: {error.message}</ErrorMessage></CenterNotice>);
    }

    if (!loading && !dashboardData) {
        return (<CenterNotice><p>Không có dữ liệu</p></CenterNotice>);
    }

    return (
        <DashboardContainer>
            <DashboardHeader>
                <h1>Dashboard</h1>
                <Button onClick={() => loadDashboard()} disabled={isRefetching} loading={isRefetching}>Làm mới</Button>
            </DashboardHeader>
            <SkeletonWrapper isLoading={loading || isRefetching}>
                <StatsGrid>
                    <StatsCard
                        icon={<FaBox/>}
                        title={'Total Products'}
                        description={`Số lượng sản phẩm: ${dashboardData?.totalProducts?.value}`}
                        change={formatChange(dashboardData?.totalProducts?.change, dashboardData?.totalProducts?.changeType)}
                    />
                    <StatsCard
                        icon={<FcStatistics/>}
                        title={'Total Orders'}
                        description={`Số lượng đơn hàng: ${dashboardData?.totalOrders?.value}`}
                        change={formatChange(dashboardData?.totalOrders?.change, dashboardData?.totalOrders?.changeType)}
                    />
                    <StatsCard
                        isWarning={true}
                        icon={<IoHourglass/>}
                        title={'Pending Orders'}
                        description={`Số đơn hàng chờ xử lý: ${dashboardData?.pendingOrders?.value}`}
                    />
                    <StatsCard
                        icon={<TbPigMoney/>}
                        title={'Revenue'}
                        description={`Tổng doanh thu: ${formatCurrency(dashboardData?.revenue?.value)}`}
                    />
                </StatsGrid>
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={loading || isRefetching}>
                {dashboardData?.lastUpdated && (
                    <LastUpdated>Cập nhật lần cuối: {dashboardData?.lastUpdated}</LastUpdated>)}
            </SkeletonWrapper>
            <RecentOrders/>
            <LowStockAlert/>
        </DashboardContainer>
    );
};
