import React from 'react';
import {AppBar, Toolbar, IconButton, Box, Avatar,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useNavigate} from 'react-router';
import useAuth from '../hooks/useAuth';
import {getFirstEmailChar} from "../utils/Utils.js";

export default function Header({onToggleSidebar, onToggleMobileMenu, sidebarCollapsed}) {
    const {logout, isAuthenticated, user} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar sx={{backgroundColor: '#fff', color: '#000000', position: 'relative'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton onClick={onToggleMobileMenu} sx={{display: {xs: 'block', md: 'none'}}}>
                        <MenuIcon/>
                    </IconButton>
                    <IconButton onClick={onToggleSidebar} sx={{display: {xs: 'none', md: 'block'}}}>
                        {sidebarCollapsed ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                    <h3>ProductOrderMgmt</h3>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    {isAuthenticated && user ? (
                        <>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <Avatar sx={{width: 32, height: 32, fontSize: '0.875rem'}}>
                                    {getFirstEmailChar(user.email)}
                                </Avatar>
                                <p>{user.email}</p>
                            </Box>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (<button onClick={() => navigate('/login')}>Login</button>)}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
