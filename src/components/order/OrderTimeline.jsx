import styled from 'styled-components';
import { formatDate } from '../../utils/Utils.js';
import {TimelineItem, TimelineSeparator, Timeline, TimelineDot, TimelineConnector, TimelineContent} from "@mui/lab";

const TimeLineStyled = styled(Timeline)`
    margin-top: 1em;
    border: 0.1em solid #e9ecef;
    padding: 1em;
`;

const TimeLineItemStyled = styled(TimelineItem)`
    padding: 0;
`;

const getColor = (status) => {
    switch (status) {
        case 'pending':
            return 'secondary';
        case 'processing':
            return 'primary';
        case 'completed':
            return 'success';
        case 'cancelled':
            return 'warning';
        default:
            return 'grey';
    }
};

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
            <TimeLineStyled>
                <h3>Order Timeline</h3>
                <p>No timeline data available</p>
            </TimeLineStyled>
        );
    }

    return (
            <TimeLineStyled position="alternate">
                <h3>Order Timeline</h3>
                {timeline.map((item) => (
                        <TimeLineItemStyled key={item.status}>
                            <TimelineSeparator>
                                <TimelineDot color={getColor(item.status)}/>
                                {item.status === 'completed' || item.status === 'cancelled' ? null : (<TimelineConnector />)}
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>{formatDate(item.date)}</div>
                                <div>{item.description}</div>
                            </TimelineContent>
                        </TimeLineItemStyled>
                    ))}
            </TimeLineStyled>
    );
}
