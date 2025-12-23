import styled from 'styled-components';
import { formatDate } from '../utils/Utils.js';

const TimelineContainer = styled.div`
    border: 0.1em solid #e9ecef;
    padding: 1em;
`;

const TimelineList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    
    &:before {
        content: '';
        position: absolute;
        left: 15px;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: #e9ecef;
    }
`;

const TimelineItem = styled.li`
    position: relative;
    padding: 0 0 1rem 2.5rem;
    
    &:before {
        content: '';
        position: absolute;
        left: 9px;
        top: 4px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${props => {
            switch (props.status) {
                case 'pending': return '#ffc107';
                case 'processing': return '#17a2b8';
                case 'completed': return '#28a745';
                case 'cancelled': return '#dc3545';
                default: return '#6c757d';
            }
        }};
        border: 2px solid white;
        box-shadow: 0 0 0 2px ${props => {
            switch (props.status) {
                case 'pending': return '#ffc107';
                case 'processing': return '#17a2b8';
                case 'completed': return '#28a745';
                case 'cancelled': return '#dc3545';
                default: return '#6c757d';
            }
        }};
    }
`;

const TimelineContent = styled.div`
    background-color: #f8f9fa;
    padding: 0.75em;
`;

// Mock timeline data - this should be from the history API
const generateTimeline = (order) => {
    if (!order) return [];
    const timeline = [];
    const createdDate = new Date(order.createdAt);
    timeline.push({
        date: order.createdAt,
        status: 'pending',
        description: 'Order created'
    });
    if (order.status !== 'pending') {
        const processDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000);
        timeline.push({
            date: processDate.toISOString(),
            status: 'processing',
            description: 'Order is being processed'
        });
        if (order.status === 'completed') {
            const completeDate = new Date(processDate.getTime() + 48 * 60 * 60 * 1000);
            timeline.push({
                date: completeDate.toISOString(),
                status: 'completed',
                description: 'Order completed and shipped'
            });
        } else if (order.status === 'cancelled') {
            const cancelDate = new Date(processDate.getTime() + 12 * 60 * 60 * 1000);
            timeline.push({
                date: cancelDate.toISOString(),
                status: 'cancelled',
                description: 'Order cancelled'
            });
        }
    } else if (order.status === 'cancelled') {
        const cancelDate = new Date(createdDate.getTime() + 2 * 60 * 60 * 1000);
        timeline.push({
            date: cancelDate.toISOString(),
            status: 'cancelled',
            description: 'Order cancelled'
        });
    }

    return timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
};

export default function OrderTimeline({ order }) {
    const timeline = generateTimeline(order);

    if (!timeline || timeline.length === 0) {
        return (
            <TimelineContainer>
                <h3>Order Timeline</h3>
                <p>No timeline data available</p>
            </TimelineContainer>
        );
    }

    return (
        <TimelineContainer>
            <h3>Order Timeline</h3>
            <TimelineList>
                {timeline.map((item) => (
                    <TimelineItem key={item.status} status={item.status}>
                        <TimelineContent>
                            <div>{formatDate(item.date)}</div>
                            <div>{item.description}</div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </TimelineList>
        </TimelineContainer>
    );
}
