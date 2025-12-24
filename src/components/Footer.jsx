import React from 'react';
import styled from 'styled-components';

const FooterContent = styled.div`
    border-top: 1px solid #000000;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5em;
    }
`;

const Links = styled.div`
    display: flex;
    gap: 1em;
`;

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <FooterContent>
            <div>© {currentYear} Product Order Management. All rights reserved.</div>
            <Links>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#support">Support</a>
            </Links>
        </FooterContent>
    );
}
