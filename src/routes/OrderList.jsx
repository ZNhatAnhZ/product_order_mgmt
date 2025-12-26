import {useState, useMemo} from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce.js';
import useOrders from '../hooks/useOrders.js';
import usePagination from '../hooks/usePagination.js';
import SearchInput from '../components/common/SearchInput.jsx';
import OrderTable from '../components/order/OrderTable.jsx';
import Pagination from '../components/common/Pagination.jsx';
import {ORDER_STATUS} from '../constants/Enum.js';
import {SkeletonWrapper} from "../components/common/SkeletonWrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Button} from "@mui/material";

const Container = styled.div`
    max-width: 120em;
    margin: 0 auto;
`;

const GapDiv = styled.div`
    display: flex;
    margin-bottom: 1em;
    gap: 1em;
`;

export default function OrderList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(ORDER_STATUS.ALL);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const {
        data: orders,
        isLoading,
        error,
    } = useOrders();

    const filteredOrders = useMemo(() => {
        if (!orders) return [];

        return orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .filter(order => {
                const orderDate = new Date(order.createdAt);
                const matchesSearch = debouncedSearchTerm === '' ||
                    order.id.toString().includes(debouncedSearchTerm) ||
                    order.customerName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
                const matchesStatus = statusFilter === ORDER_STATUS.ALL ||
                    order.status === statusFilter;
                const matchesDate = (!startDate || !endDate) || (orderDate >= startDate && orderDate <= endDate);
                return matchesSearch && matchesStatus && matchesDate;
            });
    }, [orders, debouncedSearchTerm, statusFilter, startDate, endDate]);

    const {
        currentFirstIndex,
        currentLastIndex,
        currentItems,
        totalItems,
        hasNextPage,
        hasPreviousPage,
        goToNextPage,
        goToPreviousPage
    } = usePagination(filteredOrders, 10);

    const handleViewOrder = (orderId, order) => {
        navigate(`/orders/${orderId}`, {state: {order}, viewTransition: true });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter(ORDER_STATUS.ALL);
        setStartDate(null);
        setEndDate(null);
    };

    if (error) {
        return (
            <div>
                <h3>Error loading orders</h3>
                <p>{error.message}</p>
            </div>
        );
    }

    const renderOrderList = () => {
        if (!isLoading && filteredOrders.length === 0) {
            return (<p>No Orders Found</p>);
        }

        return (
            <SkeletonWrapper isLoading={isLoading}>
                <OrderTable orders={currentItems} onView={handleViewOrder}/>
                <Pagination
                    totalItems={totalItems}
                    currentFirstIndex={currentFirstIndex}
                    currentLastIndex={currentLastIndex}
                    goToNextPage={goToNextPage}
                    hasPreviousPage={hasPreviousPage}
                    hasNextPage={hasNextPage}
                    goToPreviousPage={goToPreviousPage}
                />
            </SkeletonWrapper>
        );
    };

    return (
        <Container>
            <div>
                <h1>Orders</h1>
                <div>{totalItems} {totalItems === 1 ? 'order' : 'orders'} total</div>
            </div>
            <GapDiv>
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search by Order ID or Customer Name..."
                    isSearching={searchTerm !== debouncedSearchTerm}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value={ORDER_STATUS.ALL}>All Orders</option>
                    <option value={ORDER_STATUS.PENDING}>Pending</option>
                    <option value={ORDER_STATUS.PROCESSING}>Processing</option>
                    <option value={ORDER_STATUS.COMPLETED}>Completed</option>
                    <option value={ORDER_STATUS.CANCELLED}>Cancelled</option>
                </select>
                <DatePicker
                    onChange={(dates) => {
                        const [start, end] = dates;
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    showMonthYearDropdown
                />
                <Button onClick={handleClearFilters} size='small'>Clear Filters</Button>
            </GapDiv>
            {renderOrderList()}
        </Container>
    );
}
