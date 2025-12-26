import styled from "styled-components";

export const StatusBadge = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
    
    ${props => {
        const statusOrVariant = props.$variant || props.$status;
        
        switch (statusOrVariant) {
            case 'success':
            case 'completed':
            case 'active':
                return `
                    background-color: #d1fae5;
                    color: #065f46;
                `;
            case 'warning':
            case 'pending':
                return `
                    background-color: #fed7aa;
                    color: #9a3412;
                `;
            case 'info':
            case 'processing':
                return `
                    background-color: #dbeafe;
                    color: #1e40af;
                `;
            case 'danger':
            case 'cancelled':
            case 'inactive':
                return `
                    background-color: #fee2e2;
                    color: #991b1b;
                `;
            case 'secondary':
            default:
                return `
                    background-color: #f3f4f6;
                    color: #374151;
                `;
        }
    }}
`;