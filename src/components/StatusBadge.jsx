import styled from "styled-components";

export const StatusBadge = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
    
    ${props => {
    switch (props.status) {
        case 'completed':
            return `
                    background-color: #d1fae5;
                    color: #065f46;
                `;
        case 'pending':
            return `
                    background-color: #fed7aa;
                    color: #9a3412;
                `;
        case 'processing':
            return `
                    background-color: #dbeafe;
                    color: #1e40af;
                `;
        case 'cancelled':
            return `
                    background-color: #fee2e2;
                    color: #991b1b;
                `;
        default:
            return `
                    background-color: #f3f4f6;
                    color: #374151;
                `;
    }
}}
`;