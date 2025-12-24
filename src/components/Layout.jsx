import React, {useState} from 'react';
import {Box, useTheme} from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({children}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const theme = useTheme();

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
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1}}>
            <Header onToggleSidebar={toggleSidebar} onToggleMobileMenu={toggleMobileMenu} sidebarCollapsed={sidebarCollapsed}/>
            <Box sx={{display: 'flex'}}>
                <Sidebar collapsed={sidebarCollapsed} mobileOpen={mobileMenuOpen} onClose={closeMobileMenu}/>
                <Box
                    sx={{
                        flexGrow: 1,
                        marginLeft: '2em !important',
                        overflowY: 'auto',
                        height: '100vh',
                        transition: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        })
                    }}
                >
                    {children}
                </Box>
            </Box>
            <Footer/>
        </Box>
    );
}
