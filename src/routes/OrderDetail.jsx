import {useNavigate, useLocation} from 'react-router';
import styled from 'styled-components';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import {StatusBadge} from '../components/common/StatusBadge.jsx';
import OrderItems from '../components/order/OrderItems.jsx';
import OrderSummary from '../components/order/OrderSummary.jsx';
import StatusUpdateDropdown from '../components/order/StatusUpdateDropdown.jsx';
import OrderTimeline from '../components/order/OrderTimeline.jsx';
import {formatDate, getIsoStringDate} from '../utils/Utils.js';
import useOrders from "../hooks/useOrders.js";
import {useState} from "react";

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
`;

const MainContent = styled.div`
    display: flex;
    gap: 2em;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const InfoCard = styled.div`
    border: 1px solid #e9ecef;
    padding: 1em;
`;

const CardTitle = styled.h3`
    margin: 0 0 1rem 0;
    color: #333;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 0.5rem;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InfoLabel = styled.span`
    font-weight: 500;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 1rem;
`;

export default function OrderDetail() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [order, setOrder] = useState(state?.order);
    const {
        updateOrder,
        isUpdating
    } = useOrders();

    const handleBack = () => {
        navigate('/orders');
    };

    const handlePrint = () => {
        window.print();
    };

    const getBreadcrumbItems = () => [
        {label: 'Home', href: '/dashboard'},
        {label: 'Orders', href: '/orders'},
        {label: order ? `${order.id}` : 'Order Not Found'}
    ];

    if (!order) {
        return (
            <Container>
                <Breadcrumbs items={getBreadcrumbItems()}/>
                <div>
                    <h1>Order Not Found</h1>
                    <p>The order you're looking for doesn't exist or may have been removed.</p>
                    <button onClick={handleBack}>Back to Orders</button>
                </div>
            </Container>
        );
    }

    function getOnUpdateStatus() {
        return async (newStatus) => {
            const isoStringDate = getIsoStringDate();
            updateOrder({id: order.id, ...order, status: newStatus, updatedAt: isoStringDate});
            setOrder(prevOrder => ({...prevOrder, status: newStatus, updatedAt: isoStringDate}));
        };
    }

    return (
        <Container>
            <Breadcrumbs items={getBreadcrumbItems()}/>
            <h1>Order detail</h1>
            <MainContent>
                <LeftColumn>
                    <InfoCard>
                        <CardTitle>Order Information</CardTitle>
                        <InfoRow>
                            <InfoLabel>Order ID:</InfoLabel>
                            <div>{order.id}</div>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Order Date:</InfoLabel>
                            <div>{formatDate(order.createdAt)}</div>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Status:</InfoLabel>
                            <StatusBadge status={order.status}>{order.status}</StatusBadge>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Last Updated:</InfoLabel>
                            <div>{formatDate(order.updatedAt || order.createdAt)}</div>
                        </InfoRow>
                    </InfoCard>
                    <InfoCard>
                        <CardTitle>Customer Information</CardTitle>
                        <InfoRow>
                            <InfoLabel>Customer Name:</InfoLabel>
                            <div>{order.customerName}</div>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Customer ID:</InfoLabel>
                            <div>{order.customerId}</div>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Email:</InfoLabel>
                            <div>{order.customerEmail}</div>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Phone:</InfoLabel>
                            <div>{order.customerPhone}</div>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Address:</InfoLabel>
                            <div>{order.customerAddress}</div>
                        </InfoRow>
                    </InfoCard>
                    <InfoCard>
                        <OrderItems items={order.items}/>
                    </InfoCard>
                    <StatusUpdateDropdown
                        currentStatus={order.status}
                        onUpdateStatus={getOnUpdateStatus()}
                        isUpdating={isUpdating}
                    />
                </LeftColumn>
                <RightColumn>
                    <OrderSummary items={order.items} shippingFee={order.shippingFee}/>
                    <OrderTimeline order={order}/>
                    <ActionButtons>
                        <button onClick={handleBack}>Back to Orders</button>
                        <button onClick={handlePrint}>Print Order</button>
                    </ActionButtons>
                </RightColumn>
            </MainContent>
        </Container>
    );
}
