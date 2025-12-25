import styled from 'styled-components';
import { formatCurrency } from '../../utils/Utils.js';

const SummaryContainer = styled.div`
    border: 1px solid #e9ecef;
    padding: 1em;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
`;

const TotalValue = styled.span`
    font-weight: 700;
    font-size: 1.3rem;
`;

export default function OrderSummary({ items = [], shippingFee = 0 }) {
    const subtotal = items.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0);
    const total = subtotal + shippingFee;
    return (
        <SummaryContainer>
            <h3>Order Summary</h3>
            <SummaryRow>
                <div>Subtotal ({items.length} items)</div>
                <div>{formatCurrency(subtotal)}</div>
            </SummaryRow>
            <SummaryRow>
                <div>Shipping Fee</div>
                <div>{shippingFee > 0 ? formatCurrency(shippingFee) : 'Free'}</div>
            </SummaryRow>
            <SummaryRow>
                <div>Total</div>
                <TotalValue>{formatCurrency(total)}</TotalValue>
            </SummaryRow>
        </SummaryContainer>
    );
}
