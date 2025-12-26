import React, {useState} from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import styled from "styled-components";

const LayoutDiv = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
`

const FlexDiv = styled.div`
    display: flex;
`

const ContentDiv = styled.div`
    flex-grow: 1;
    margin-left: 2em;
    overflow-y: auto;
    height: 89vh;
    margin-top: 1em;
`

export default function Layout({children}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <LayoutDiv>
            <Header onToggleMobileMenu={toggleMobileMenu}/>
            <FlexDiv>
                <Sidebar mobileOpen={mobileMenuOpen} onClose={closeMobileMenu}/>
                <ContentDiv>{children}</ContentDiv>
            </FlexDiv>
            <Footer/>
        </LayoutDiv>
    );
}
