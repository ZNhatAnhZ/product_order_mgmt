import { Link } from "react-router";
import styled from 'styled-components';

const BreadcrumbContainer = styled.nav`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
    color: #6c757d;
`;

const BreadcrumbLink = styled(Link)`
    color: #007bff;
`;

const BreadcrumbSeparator = styled.span`
    color: #6c757d;
`;

const BreadcrumbCurrent = styled.span`
    color: #495057;
    font-weight: 500;
`;

export default function Breadcrumbs({ items }) {
    return (
        <BreadcrumbContainer>
            {items.map((item, index) => (
                <span key={index}>
                    {index > 0 && <BreadcrumbSeparator> &gt; </BreadcrumbSeparator>}
                    {item.href ? (
                        <BreadcrumbLink to={item.href}>
                            {item.label}
                        </BreadcrumbLink>
                    ) : (
                        <BreadcrumbCurrent>{item.label}</BreadcrumbCurrent>
                    )}
                </span>
            ))}
        </BreadcrumbContainer>
    );
}
