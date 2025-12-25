import React, {useState} from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import styled from "styled-components";

const LayoutDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1
`

const FlexDiv = styled.div`
    display: flex;
`

const ContentDiv = styled.div`
    flex-grow: 1;
    margin-left: 2em;
    overflow-y: auto;
    height: 100vh;
    margin-top: 1em;
`

export default function Layout({children}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <LayoutDiv>
            <Header onToggleSidebar={toggleSidebar} onToggleMobileMenu={toggleMobileMenu} sidebarCollapsed={sidebarCollapsed}/>
            <FlexDiv>
                <Sidebar collapsed={sidebarCollapsed} mobileOpen={mobileMenuOpen} onClose={closeMobileMenu}/>
                <ContentDiv>{children}</ContentDiv>
            </FlexDiv>
            <Footer/>
        </LayoutDiv>
    );
}
